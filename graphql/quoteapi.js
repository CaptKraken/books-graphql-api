import { RESTDataSource } from "apollo-datasource-rest";
import { randomQuote } from "./localquotes";

export class QuoteApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://goquotes-api.herokuapp.com/api/v1";
  }
  async getRandomMotivationalQuote() {
    return Promise.race([
      this.get(`/random/1?type=tag&val=motivational`),
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(() => {
              return randomQuote();
            }),
          1500
        )
      ),
    ]);
    // return this.get(`/random/1?type=tag&val=motivational`);
  }
}
