import express from 'express';
import bodyParser from 'body-parser';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';

const API_KEY = 'f2cc7d451440fc13d750c91ba47faca9';
const port = 1234;
const globalData = {
  users: [],
  allCities: {},
  history: [],
  notAuthTokens: {},
};

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const userExists = globalData.users.some((user) => user.name === username);
  if (userExists) {
    sendError(res, 409, 'Пользователь с таким именем уже существует');
  } else {
    const token = generateToken();
    globalData.users.push({
      name: username,
      password,
      token,
    });
    res.send({ token });
    void saveGlobalData();
  }
});

app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  const user = globalData.users.find((user) => user.name === username);
  if (!user) {
    sendError(res, 404, 'Отсутствует пользователь с таким именем');
  } else if (user.password !== password) {
    sendError(res, 401, 'Неправильно указан пароль пользователя');
  } else {
    const token = generateToken();
    user.token = token;
    res.send({ token });
    void saveGlobalData();
  }
});

app.post('/api/signout', (req, res) => {
  const { token } = req.body;
  const user = globalData.users.find((user) => user.token === token);
  if (!user) {
    sendError(res, 404, 'Пользователь не найден');
  } else {
    user.token = null;
    res.send();
    void saveGlobalData();
  }
});

app.get('/api/me', (req, res) => {
  const { token } = req.query;
  const user = globalData.users.find((user) => user.token === token);
  if (!user) {
    res.send({ isAuth: false });
  } else {
    res.send({ isAuth: true, username: user.name });
  }
});

app.get('/api/cities/search', async (req, res) => {
  const { search } = req.query;
  const result = await weatherApiGet(`/geo/1.0/direct?q=${search}&limit=5`);
  const cities = result.map(({ country, lat, lon, name, state }) => {
    return { country, lat, lon, name, state };
  });
  res.send(cities.map(getCityKey));
  cities.forEach((city) => {
    const key = getCityKey(city);
    globalData.allCities[key] = city;
  });
  await saveGlobalData();
});

app.get('/api/weather', async (req, res) => {
  const { key, token } = req.query;
  const { lat, lon } = globalData.allCities[key];
  const user = globalData.users.find((user) => user.token === token);
  if (!user) {
    if (!globalData.notAuthTokens[token]) {
      globalData.notAuthTokens[token] = 15;
      setTimeout(async () => {
        delete globalData.notAuthTokens[token];
        await saveGlobalData();
      }, 1000 * 60 * 60);
    }

    if (globalData.notAuthTokens[token] <= 0) {
      sendError(
        res,
        401,
        'Войдите, чтобы продолжить поиск, или дождитесь обновления лимита'
      );
      await saveGlobalData();
      return;
    }
  }
  const result = await weatherApiGet(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru`);
  const handled = result.list.map(data => {
    return {
      time: data.dt * 1000,
      temp: data.main?.temp ?? 'Н/Д',
      weather: data.weather?.[0]?.description ?? 'Н/Д',
      img: `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png` ?? '',
      windSpeed: data.wind?.speed ?? 'Н/Д',
      windDir: windDegToDirection(data.wind.deg),
    }
  });
  res.send(handled);
  globalData.history.push({ key, user: user?.name ?? null, token: !user ? token : null });
  await saveGlobalData();
});



app.listen(port, async () => {
  console.info(`Прослушивание порта: ${port}`);
  await loadGlobalData();
  console.info('Данные сервера загружены');
});

async function loadGlobalData() {
  const data = await readFile('data.json', 'utf8');
  Object.assign(globalData, JSON.parse(data));
}

async function saveGlobalData() {
  await writeFile('data.json', JSON.stringify(globalData), 'utf8');
}

function generateToken() {
  return uuidv4();
}

function sendError(res, code, message) {
  res.status(code);
  res.send({ message });
}

async function weatherApiGet(url) {
  return new Promise((resolve, reject) => {
    http
      .get(
        {
          host: 'api.openweathermap.org',
          path: encodeURI(`${url}&appid=${API_KEY}`),
        },
        (res) => {
          const data = [];
          const errors = [];
          res.on('data', (d) => data.push(d.toString()));
          res.on('error', (err) => errors.push(err.toString()));
          res.on('end', () => {
            if (errors.length) {
              reject(errors.join(''));
            } else {
              resolve(JSON.parse(data.join('')));
            }
          });
        }
      )
      .end();
  });
}

function getCityKey(city) {
  return `${city.name}, ${city.state}, ${city.country}`;
}

function getCityData(key) {
  return globalData.allCities[key];
}

function windDegToDirection(deg) {
  switch (true) {
    case deg < 22.5 || deg >= 337.5:
      return 'с';
    case deg < 67.5:
      return 'с/в';
    case deg < 112.5:
      return 'в';
    case deg < 157.5:
      return 'ю/в';
    case deg < 202.5:
      return 'ю';
    case deg < 247.5:
      return 'ю/з';
    case deg < 292.5:
      return 'з';
    case deg < 337.5:
      return 'с/з';
    default:
      return 'Н/Д';
  }
}
// async function getCities(search) {
//   return await weatherApiGet(`/geo/1.0/direct?q=${search}&limit=5`);
// }
