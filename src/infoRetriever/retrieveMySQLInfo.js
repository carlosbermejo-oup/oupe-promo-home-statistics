const {withMySQLConnection} = require("../setup/databaseConnection");
const {isMySQLUp} = require("./verifyConnection");
const {mapWordpressPostToPromotionID} = require("./retrieveWordpressInfo");

const retrieveCountForPromotion = async (appSettings) => {
  let distinctPromotionIDs;
  let promotionInformation;

  const mySQLStatus = await isMySQLUp(appSettings);

  if (mySQLStatus) {
    await withMySQLConnection(appSettings, async (connection) => {
      distinctPromotionIDs = await queryDistinctPromotionIDs(connection);
    });

    // promotionInformation = await mapWordpressPostToPromotionID(distinctPromotionIDs)
    await mapWordpressPostToPromotionID(["4639"])
  }
}

const queryDistinctPromotionIDs = async (connection) => {
  let formattedResult = [];
  try {
    const distinctPromotionIDs = await connection.query(
      "SELECT DISTINCT `pp`.`idpromotion`" +
      "FROM `profesor_promotion` AS `pp` " +
      'WHERE `pp`.`idpromotiontype` = "7" ' +
      'ORDER BY `pp`.`registerdate` DESC ;'
    );
    formattedResult = distinctPromotionIDs[0].map(id => id.idpromotion);

    return formattedResult;
  } catch (err) {
    throw new Error(`Error trying to query the DB: ${err}`);
  }
}

module.exports = {retrieveCountForPromotion}