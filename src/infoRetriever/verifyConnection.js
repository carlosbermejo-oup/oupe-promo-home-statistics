const pactumJS = require("pactum");

const isMySQLUp = async (environmentSettings) => {
  try {
    const response = await pactumJS.spec().get(`${environmentSettings.settings.urls.premium_url}/check/mysql`)
      .expectStatus(200)
      .toss();

    return true;
  } catch (e) {
    throw new Error(`Error verifying MySQL status. ${e}`);
  }
};

module.exports = {isMySQLUp}