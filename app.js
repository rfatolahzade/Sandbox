var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var app = express();
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://724e38e629e0438dabc2705babdd19dc@sentry.rayvarz.dev/4",
  tracesSampleRate: 1.0
});

app.get("/Exception", function mainHandler(req, res) {
  throw new Error("An exception occured!");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use("/users", usersRouter);
app.get("/Hello", function rootHandler(req, res) {
  res.end("Hello world!!");
});

app.use("/POW", function (req, res, next) {
  res.send(Math.pow(req.query.a, req.query.b).toString());
});
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
