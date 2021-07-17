const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const usersRouter = require("./routes/users");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();
Sentry.init({
  dsn: "https://fefc3318efb54a7d80be1d8374919dec@sentry.rayvarz.dev/3",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({
      app
    })
  ],
  tracesSampleRate: 1.0,
  release: 1
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/POW", function (req, res) {
  res.send(Math.pow(req.query.a, req.query.b).toString());
});

app.get("/Hello", function rootHandler(req, res) {
  res.end("Hello world!!");
});
// app.use("/users", usersRouter);
app.get("/Exception", function mainHandler(req, res) {
  throw new Error("An exception occured!");
});

app.use(Sentry.Handlers.errorHandler());
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
