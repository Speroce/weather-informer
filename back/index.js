import http from "http";

http
  .get(
    {
      host: "api.openweathermap.org",
      path: "/data/2.5/weather?q=London,uk&APPID=f2cc7d451440fc13d750c91ba47faca9",
    },
    (res) => {
      console.log(res.statusCode);
      const data = [];
      res.on("data", (d) => data.push(d.toString()));
      res.on("end", () => console.log(data));
    }
  )
  .end();
