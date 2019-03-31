import dotenv from "dotenv";
dotenv.config();
import puppeter from 'puppeteer'

const sleep = (sec:number) => new Promise(resolve => setTimeout(resolve, sec*1000));

const login = async ():Promise<puppeter.Browser>=>{

    console.log('running')
    const browser = await puppeter.launch({
        headless:false,
        args:['--no-sandbox']
    })

    const page = await browser.newPage()
    await page.goto('https://dh.force.com/digitalCampus/CampusLogin')
    const fields = await page.$$('.loginInput')
    if (fields.length !== 2){
        throw new Error('Not found')
    }
    console.log(fields)
    await fields[0].type(process.env.DC_NAME as string)
    await fields[1].type(process.env.DC_PASSWORD as string)
    await page.click('.loginBtn')
    return browser
}

login()