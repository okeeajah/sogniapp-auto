const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const dataPath = path.join(__dirname, 'data.txt');
    const credentials = fs.readFileSync(dataPath, 'utf-8').trim().split('\n');
    const username = credentials[0];
    const password = credentials[1];

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.goto('https://app.sogni.ai/');

    await page.waitForSelector('body > div._backdrop_1y9op_1 > div > div > div._contentPanel_e6t3l_74 > div._formFooter_e6t3l_116 > button._button_1a2p7_1._variant-default_1a2p7_41._size-md_1a2p7_90._fullWidth_1a2p7_23');
    await page.click('body > div._backdrop_1y9op_1 > div > div > div._contentPanel_e6t3l_74 > div._formFooter_e6t3l_116 > button._button_1a2p7_1._variant-default_1a2p7_41._size-md_1a2p7_90._fullWidth_1a2p7_23');

    await page.waitForSelector('#element-1');
    await page.type('#element-1', username);

    await page.waitForSelector('#element-2');
    await page.type('#element-2', password);

    await page.waitForSelector('body > div._backdrop_1y9op_1 > div > div > form > div._formFooter_e6t3l_116 > button._button_1a2p7_1._variant-primary_1a2p7_52._size-md_1a2p7_90._fullWidth_1a2p7_23');
    await page.click('body > div._backdrop_1y9op_1 > div > div > form > div._formFooter_e6t3l_116 > button._button_1a2p7_1._variant-primary_1a2p7_52._size-md_1a2p7_90._fullWidth_1a2p7_23');

    await new Promise(resolve => setTimeout(resolve, 5000));

    await page.waitForSelector('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(4) > div > button:nth-child(4)');
    await page.click('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(4) > div > button:nth-child(4)');

    console.log('Sukses Login');

    while (true) {
        console.log('Menunggu 10 detik sebelum Generate Ulang...');
        for (let i = 10; i > 0; i--) {
            process.stdout.write(`\rHitungan mundur: ${i} detik `);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('\nGenerate Image...');
        await page.waitForSelector('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(2) > button');
        await page.click('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(2) > button');

        console.log('Mengulangi proses...');
    }
})();
