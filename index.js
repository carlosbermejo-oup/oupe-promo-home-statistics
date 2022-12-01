const {setAppEnvironment} = require("./src/setup/setAppEnvironment");
const {retrieveCountForPromotion} = require("./src/infoRetriever/retrieveMySQLInfo");

setAppEnvironment().then(async (appSettings) => {
  await retrieveCountForPromotion(appSettings);
});