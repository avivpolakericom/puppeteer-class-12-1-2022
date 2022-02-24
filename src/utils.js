const puppeteer = require("puppeteer");
const { Parser } = require("json2csv");

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
const labels = [
    "סומן",
    "תווית",
    "empty1",
    "empty2",
    "נכס",
    "חדרים",
    "בנוי",
    "עיר",
    "שכונה",
    "רחוב",
    "קו",
    "תוספות",
    "מחיר ",
    "השכרה",
    "empty3",
    "empty4",
    "שם",
    "טלפון",
    "פתיחה",
    "עודכן",
    "empty5",
    "empty6",
    "empty7",
    "empty8",
    "empty9",
];
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
const dataToCsv = async (data) => {
    //making jason with labels
    const finalJson = [];
    for (let row of data) {
        const json = {};
        for (let i = 0; i < row.length; i++) {
            json[labels[i]] = row[i];
        }
        finalJson.push(json);
    }
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(finalJson);
    return csv;
};
function getRandomNum() {
    return Math.random() * 200;
}

module.exports = { dataToCsv, getTableFromNadlanOne };
// function optimalPoint(magic, dist) {
//     // Write your code here

//     for (let i = 0; i < magic.length; i++) {
//         if (isOptimalPoint(magic, dist)) {
//             return i;
//         }
//         magic = [...magic.slice(1), magic[0]];
//         dist = [...dist.slice(1), dist[0]];
//     }
//     return -1;
// }
// const isOptimalPoint = (magic, dist) => {
//     let sum = 0;
//     for (let i = 0; i < magic.length; i++) {
//         sum += magic[i];
//         sum -= dist[i];
//         if (sum < 0) {
//             return false;
//         }
//     }
//     return true;
// };
// optimalPoint([3, 5, 2, 4], [2, 10, 3, 2]);

function horizontalCheck(picture) {
    // Write your code here
    let tie = [];
    for (let i = 0; i < picture.length; i++) {
        const row = picture[i];
        for (let j = 0; j < picture[i].length; j++) {
            if (picture[i][j] && picture[i][j + 1]) {
                const Maincolor = picture[i][j];
                const rigthColor = picture[i][j + 1] || null;
                row[j] = Maincolor === rigthColor;
            }
        }
        tie.push(row.slice(0, row.length - 1));
    }
    return tie;
}
function alingCheck(picture) {
    // Write your code here
    let tie = [];
    for (let i = 0; i < picture.length-1; i++) {
        const row = picture[i];
        for (let j = 0; j < picture[i].length; j++) {
            if(picture[i][j] && picture[i + 1] && picture[i + 1][j]){
            if (picture[i][j] && picture[i+1][j]) {
                const Maincolor = picture[i][j];
                const downColor = picture[i+1][j] || null;
                row[j] = Maincolor === downColor;
            }}
        }
        tie.push(row);
    }
    return tie;
}

console.log(
    horizontalCheck([
        ["a", "b", "c"],
        ["a", "a", "c"],
        ["a", "c", "c"],
    ]),
    alingCheck([
        ["a", "b", "c"],
        ["a", "a", "c"],
        ["a", "c", "c"],
    ])
);
