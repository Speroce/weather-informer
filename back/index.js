import express from 'express';
import bodyParser from 'body-parser';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';

const API_KEY = 'f2cc7d451440fc13d750c91ba47faca9';
const port = 1234;
const globalData = {
  users: [],
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
              resolve(data.join(''));
            }
          });
        }
      )
      .end();
  });
}
