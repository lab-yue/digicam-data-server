import puppeter from "puppeteer"
import * as gql from "../gql"
import Course from "./course"
import Info from "./info"
export interface APIWindow extends Window {
  helpers: { getClickLink(raw: string | null): string }
}

export default class API {
  public info: Info
  public course: Course

  public browser: puppeter.Browser | null = null

  public urls = {
    login: "https://dh.force.com/digitalCampus/CampusLogin",
    info:
      "https://dh.force.com/digitalCampus/CampusDeliveryList?displayType=103",
    course:
      "https://dh.force.com/digitalCampus/CampusDeliveryList?displayType=105",
  }

  constructor() {
    this.info = new Info(this)
    this.course = new Course(this)
  }

  public async sleep(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000))
  }

  public async login(): Promise<puppeter.Browser> {
    if (this.browser) {
      return this.browser
    }

    const { DC_NAME, DC_PASSWORD } = process.env

    if (!DC_NAME || !DC_PASSWORD) {
      throw new Error("Please check your config")
    }

    const browser = await puppeter.launch({
      headless: false,
      args: ["--no-sandbox"],
    })

    const page = await browser.newPage()

    await page.goto(this.urls.login)

    const fields = await page.$$(".loginInput")
    if (fields.length !== 2) {
      throw new Error("Not found")
    }

    await fields[0].type(DC_NAME)
    await fields[1].type(DC_PASSWORD)

    await page.click(".loginBtn")
    await page.waitForNavigation()
    this.browser = browser
    return browser
  }

  public async exposeHelpers(page: puppeter.Page) {
    await page.evaluate(() => {
      (window as APIWindow).helpers = {
        getClickLink(raw: string | null) {
          if (!raw) {
            return ""
          }
          const parts = raw.split("'")

          if (parts.length !== 3) {
            return ""
          }
          return "https://dh.force.com" + parts[1]
        },
      }
    })
  }

  public async getNewPage() {
    const browser = await this.login()
    const page = await browser.newPage()
    await page.goto(this.urls.course)
    await this.exposeHelpers(page)
    return page
  }
}
