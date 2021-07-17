﻿// import * as Sentry from "@sentry/node";
Sentry.init({
  environment: "Testing",
  dsn: "https://724e38e629e0438dabc2705babdd19dc@sentry.rayvarz.dev/4",
  tracesSampleRate: 1.0,
  integrations: [new Sentry.Integrations.BrowserTracing()],
  sampleRate: 1.0
});
