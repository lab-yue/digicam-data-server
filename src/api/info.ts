import * as gql from "../gql"
import APIEndpoint from "./apiEndpoint"
import API, { APIWindow} from "./index"
export default class Info extends APIEndpoint {
  constructor(api: API) {
    super(api)
  }
  public async getAll(): Promise<gql.Info[]> {
    const page = await this.browserAPI.getNewPage()
    const infoList = await page.$$eval<gql.Info[]>("tbody tr + tr", (rows) => {
      return rows.map((row) => {
        const link = (window as APIWindow).helpers.getClickLink(
          row.getAttribute("onclick"),
        )
        const cells = Array.from(row.getElementsByTagName("td")).map((cell) =>
          cell.innerHTML.trim(),
        )
        return {
          catagroy: cells[0],
          date: cells[1],
          property: cells[2],
          title: cells[3],
          sender: cells[4],
          status: cells[5],
          link,
        }
      })
    })
    await page.close()
    return infoList
  }
}
