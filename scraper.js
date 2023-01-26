const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // scraping an image
    const [el] = await page.$x('//*[@id="galleryImagesLisnk"]/p/img');
    const src = await el.getProperty('src');
    const srcText = await src.jsonValue();

    // scraping text
    const [el2] = await page.$x('//*[@id="main-pdp-div"]/div[2]/div[1]/div[1]');
    const txt = await el2.getProperty('textContent');
    const rawText = await txt.jsonValue();

    // scraping text
    const [el3] = await page.$x('//*[@id="main-pdp-div"]/div[2]/div[2]/div[4]/div[1]/div/p/span');
    const price = await el3.getProperty('textContent');
    const priceText = await price.jsonValue();

    console.log({srcText, rawText, priceText});

    browser.close();
}

scrapeProduct('https://www.technopolis.bg/en/Monitors/Monitor-AOC-24B1H/p/501241');