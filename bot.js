const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const dataPath = path.join(__dirname, 'data.txt');
    const credentialsList = fs.readFileSync(dataPath, 'utf-8').trim().split('\n'); // Each line contains `username|password`

    // Function to handle each account
    const handleAccount = async (credentials) => {
        const [username, password] = credentials.split('|').map(cred => cred.trim());
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
        });

        try {
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

            console.log(`Sukses Login dengan akun: ${username}`);

            while (true) { // Keep running indefinitely
                console.log(`Akun ${username}: Menunggu 3 menit sebelum Generate Ulang...`);
                await new Promise(resolve => setTimeout(resolve, 180000)); // 5 minutes

                console.log(`Akun ${username}: Generate Image...`);
                await page.waitForSelector('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(2) > button');
                await page.click('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(2) > button');
            }
        } catch (error) {
            console.error(`Error pada akun ${username}:`, error);
        } finally {
            await browser.close();
        }
    };

    // Run all accounts in parallel using Promise.all
    await Promise.all(credentialsList.map(credentials => handleAccount(credentials)));

    console.log('Semua akun sedang diproses dan akan terus berjalan.');
})();
