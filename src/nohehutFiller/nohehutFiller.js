const puppeteer = require("puppeteer");

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
const getTableFromNadlanOne = async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 40 });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(100000);
    await page.goto("https://mls.nadlanone.co.il/");
    await page.type("#UserName", "0543505165", {
        delay: getRandomNum(),
    });
    await page.type("#Password", "102030", {
        delay: getRandomNum(),
    });
    await page.click(
        "#content-wrapper > div > div > div.col-xs-4.img-rounded > form > input.btn.btn-primary.center-block"
    );
    await delay(15000);
    await page.keyboard.press("Escape");
    await page.click("#tabs > ul > li:nth-child(2)");
    await delay(15000);
    await page.type("#CityList_chosen > ul > li > input", "פתח תקווה", {
        delay: getRandomNum(),
    });
    await page.keyboard.press("Enter");
    await delay(5000);
    await page.click("#search");
    await delay(15000);
    await page.click("#tab-2 > a > i");
    await delay(3000);
    await page.click("#tab-3 > a > i");
    await delay(3000);
    await page.click("#tab-6 > a > i");
    await delay(5000);

    const data = await page.evaluate(() => {
        const rows = document.querySelectorAll("#prop-grid tr");
        return Array.from(rows, (row) => {
            const columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
        });
    });
    return data;
};