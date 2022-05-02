const puppeteer = require("puppeteer");
const {readConfig} =require("./configReader")

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
const fill = async () => {
    const config = await readConfig("./config.yml")
   //login
     const browser = await puppeteer.launch({ headless: false, slowMo: 40 });
     const page = await browser.newPage();
     await page.setDefaultNavigationTimeout(100000);
     await page.goto("https://priority-web.ericom.com/inout.html");
          await delay(5000);

    await page.type("#NAM", config.username, {
        delay: getRandomNum(),
    });
    await page.type("#PAS",config.password, {
        delay: getRandomNum(),
    });
    await page.click(
        "body > form > button"
    );
    await delay(5000);
    await page.click(
        "body > form > table > tbody > tr:nth-child(2) > td.last2 > font > a"
    );
    await delay(5000);
    //filling the data
    for(let month in config.Attendance){
        for(let day in config.Attendance[month]){
            con
        }
    }
    await page.click(
        "body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > font:nth-child(4) > a > img"
    );
    await delay(3000);
    const date = `${}`


   
    // await delay(15000);
    // await page.keyboard.press("Escape");
    // await page.click("#tabs > ul > li:nth-child(2)");
    // await delay(15000);
    // await page.type("#CityList_chosen > ul > li > input", "פתח תקווה", {
    //     delay: getRandomNum(),
    // });
    // await page.keyboard.press("Enter");
    // await delay(5000);
    // await page.click("#search");
    // await delay(15000);
    // await page.click("#tab-2 > a > i");
    // await delay(3000);
    // await page.click("#tab-3 > a > i");
    // await delay(3000);
    // await page.click("#tab-6 > a > i");
    // await delay(5000);

    // const data = await page.evaluate(() => {
    //     const rows = document.querySelectorAll("#prop-grid tr");
    //     return Array.from(rows, (row) => {
    //         const columns = row.querySelectorAll("td");
    //         return Array.from(columns, (column) => column.innerText);
    //     });
    // });
    // return data;
};
fill()
function getRandomNum() {
    return Math.random() * 200;
}