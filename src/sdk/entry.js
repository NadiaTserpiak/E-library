const contentstack = require("contentstack")

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : "us",
})
export default {
  getEntry(ctUid, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  getSpecificEntry(ctUid, entryUrl, locale) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(ctUid)
        .Query()
        .addParam('width', 'auto')
        .addParam('height', '500')
        .language(locale)
        .includeOwner()
        .toJSON()
      const data = blogQuery.where("url", `/${entryUrl}`).find()

      data.then(
        (result) => {
          resolve(result[0])
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
}
