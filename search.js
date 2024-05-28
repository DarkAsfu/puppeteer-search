const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to DuckDuckGo
    await page.goto('https://www.duckduckgo.com');

    // Type the search query and submit
    const searchQuery = 'github DarkAsfu';
    await page.type('input[name="q"]', searchQuery);
    await page.keyboard.press('Enter');

    // Wait for the results to load
    await page.waitForSelector('h2 a');

    // Extract the results
    const results = await page.evaluate(() => {
        let items = Array.from(document.querySelectorAll('h2 a')).map(item => item.innerText);
        return items;
    });

    // Print the results to the console
    console.log(results);

    // Close the browser
    await browser.close();
})();
