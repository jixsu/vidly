import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn:
      "https://5301edf230ec49c1a050d2ccb8c32494@o435333.ingest.sentry.io/5394535",
  });
}

function log(error) {
  // Raven.captureException(error);
}

export default {
  init,
  log,
};
