import API from "./index"
export default abstract class APIEndpoint {
    public browserAPI: API
    constructor(browserAPI: API) {
      this.browserAPI = browserAPI
    }
  }
