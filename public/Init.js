Sentry.init({
  environment: "Testing",
  dsn: "https://fefc3318efb54a7d80be1d8374919dec@sentry.rayvarz.dev/3",
  tracesSampleRate: 1.0,
  integrations: [new Sentry.Integrations.BrowserTracing()],
  // sampleRate: 1.0
  release: 1
});

function CallPow(num1, num2) {
  axios.get("/POW?a=" + num1 + "&b=" + num2).then((result) => {
    let resultInput = document.getElementById("Result");
    resultInput.value = result.data;
  });
}

// CallPow(2, 3);
