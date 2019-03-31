import puppeter from "puppeteer"
import * as gql from "../gql"
export default class Api {

    public browser: puppeter.Browser | null = null

    public urls = {
        login: "https://dh.force.com/digitalCampus/CampusLogin",
        info: "https://dh.force.com/digitalCampus/CampusDeliveryList?displayType=103",
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

    public async getAllInfo(): Promise<gql.Info[]> {
        const browser = await this.login()
        const page = await browser.newPage()
        await page.goto(this.urls.info)

        const infoList = await page.$$eval<gql.Info[]>("tbody tr + tr", (rows) => {

            const getClickLink = (raw: string | null) => {
                if (!raw) {
                    return ""
                }
                const parts = raw.split("'")

                if (parts.length !== 3) {
                    return ""
                }
                return "https://dh.force.com" + parts[1]
            }

            return rows.map((row) => {
                const link = getClickLink(row.getAttribute("onclick"))
                const cells = Array.from(
                    row
                        .getElementsByTagName("td"))
                        .map((cell) => cell.innerHTML.trim(),
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
