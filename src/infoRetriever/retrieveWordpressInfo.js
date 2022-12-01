const pactumJs = require("pactum");
const wpApiBaseUrl = "https://help.oupe.es/wp-json/wp/v2/posts";
const mapWordpressPostToPromotionID = async (arrayOfPromotionIDs) => {
  let result = [];
  if (arrayOfPromotionIDs.length > 0) {
    for (const promotionID of arrayOfPromotionIDs) {
      const resp = await pactumJs.spec()
        .get(`${wpApiBaseUrl}/${promotionID}`)
        .withRequestTimeout(10 * 1000)
        .withAuth(global.wp_username, wp_password)
        .expectStatus(200)
        .toss();


        const adoptedTitleArray = resp.body.excerpt.rendered.split("@")[0].replace("<p>AD:", "");
        const demoTitleArrayFirst = resp.body.excerpt.rendered.split("@")[1].replace("PM:", "").replace("</p>\n", "");
        // const demoTitleArray = demoTitleArrayFirst.replace("</p>\n", "");

        result.push({
          promotionID: promotionID,
          adoptedTitle: adoptedTitleArray.split(","),
          demoTitle: demoTitleArrayFirst.split(",")
        })
    }
  }
  console.log(result)
}

module.exports = {mapWordpressPostToPromotionID}