import * as gql from "../gql"
import APIEndpoint from "./apiEndpoint"
import API, { APIWindow } from "./index"

export default class Course extends APIEndpoint {
  constructor(api: API) {
    super(api)
  }

  public async getAll(): Promise<gql.Course[]> {
    const page = await this.browserAPI.getNewPage()
    const courseList = await page.$$eval<gql.Course[]>(
      "tbody tr + tr",
      (rows) => {
        return rows.map((row) => {
          const link = (window as APIWindow).helpers.getClickLink(
            row.getAttribute("onclick"),
          )
          const cells = Array.from(row.getElementsByTagName("td")).map((cell) =>
            cell.innerHTML.trim(),
          )

          const dayMatch = cells[4].match(/">(.+?)<\/span>$/)
          return {
            title: cells[0],
            teachers: cells[1].split(","),
            year: cells[2],
            availability: cells[3],
            day: dayMatch ? dayMatch[1] : "",
            time: cells[5],
            status: cells[5],
            link,
          }
        })
      },
    )
    await page.close()
    return courseList
  }
}
