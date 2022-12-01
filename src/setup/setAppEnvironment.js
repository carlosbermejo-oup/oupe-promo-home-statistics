const {manageArgumentVariables} = require("./manageArgumentVariables");
const {setupConfigurationCli} = require("./setupConfigurationCli");
const path = require("path");
const fse = require("fs-extra");


const setAppEnvironment = async () => {
  const appEnvironment = manageArgumentVariables();
  await setupConfigurationCli(appEnvironment);
  return setConfigEnvironmentVariable(global.environment);
}

const readEnvironmentFiles = () => {
  try {
    const configParsed = fse.readJsonSync(
      path.resolve(__dirname, `../../config/${process.env.NODE_CONFIG_ENV}.json`)
    );
    global.ENV_SETTINGS = configParsed;
    return configParsed;
  } catch (e) {
    throw new Error(e);
  }
};

const setConfigEnvironmentVariable = (environmnetName) => {
  let environmentSettings;
  switch (environmnetName) {
    case "dev":
    case "development":
      process.env.NODE_CONFIG_ENV = "development";
      environmentSettings = readEnvironmentFiles();
      return environmentSettings;
    case "pre":
    case "prepro":
    case "preproduction":
      process.env.NODE_CONFIG_ENV = "preproduction";
      environmentSettings = readEnvironmentFiles();
      return environmentSettings;
    case "pro":
    case "prod":
    case "production":
      process.env.NODE_CONFIG_ENV = "production";
      environmentSettings = readEnvironmentFiles();
      return environmentSettings;
    default:
      throw new Error(
        `Incorrect environment ${environmnetName}, please make sure that you entered a valid env name.`
      );
  }
};

module.exports = {setAppEnvironment}