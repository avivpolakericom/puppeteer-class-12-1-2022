const puppeteer = require("puppeteer");
const { readConfig } = require("./configReader")

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
    await page.waitForSelector('#NAM');
    await page.type("#NAM", config.username, {
        delay: getRandomNum(),
    });
    await page.type("#PAS", config.password, {
        delay: getRandomNum(),
    });
    await page.click(
        "body > form > button"
    );
    await delay(3000);
    try {
        await page.click(
            "body > form > table > tbody > tr:nth-child(2) > td.last2 > font > a"
        );
    } catch (error) {
        //no button -hebrow
        try {
            await page.click(
                "body > form > table > tbody > tr:nth-child(3) > td.last2 > font > a"
            );
            await page.waitForSelector('body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2) > font > select');
            await page.select('body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2) > font > select', 'ericom')
            await page.select('body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1) > font > select', "2")
            await page.click(
                "body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(1) > font > a > img"
            );
            await page.click(
                "body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > a > img"
            );

        } catch (error) {
            //english
            await page.select('body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2) > font > select', 'ericom')
            await page.select('body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > font > select', "2")
            await page.waitForSelector('body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(3) > font > a > img');
            await page.click(
                "body > form > table:nth-child(2) > tbody > tr > td > div > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(3) > font > a > img"
            );
            await page.waitForSelector('body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > a > img');
            await page.click(
                "body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > a > img"
            );
            await page.waitForSelector('body > form > table > tbody > tr:nth-child(2) > td.last1 > font > a > span');
            await page.click(
                "body > form > table > tbody > tr:nth-child(2) > td.last1 > font > a > span"
            );
        }
    }
    await delay(2000)

    await page.waitForSelector('body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > font:nth-child(4) > a > img');
    // //filling the data
    await page.click(
        "body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > font:nth-child(4) > a > img"
    );
    await delay(3000)
    const elementHandle = await page.waitForSelector('#FRAME1');
    const frame = await elementHandle.contentFrame();
    for (const year in config.Attendance) {
        for (const month in config.Attendance[year]) {
            const sortedDays = Object.keys(config.Attendance[year][month]).sort((a, b) => Number(a) - Number(b))
            for (const sortedDay of sortedDays) {
                try {
                    const { start, end } = config.Attendance[year][month][sortedDay]
                    const date = `${sortedDay}${month}${year}`
                    try {
                        await fillDay(frame, date, start, end, true)
                    } catch (error) {
                        await page.click(
                            "body > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > font:nth-child(4) > a > img"
                        );
                        await fillDay(frame, date, start, end, true)
                    }                    
                } catch (error) {
                    console.log(`could not fill ${date}`)
                }
                  
            }
        }
    }
};
fill()


const fillDay = async (frame, date, start, end, fake = false) => {
    await delay(2000);
    await frame.type('body > form > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > font > input[type=text]', date);
    await frame.type('body > form > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > font > input[type=text]', start);
    await frame.type('body > form > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > font > input[type=text]', end);
    await frame.select('body > form > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2) > font > select', "-101");
    if (fake) {
        await frame.click('body > form > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td.bttn2 > font > a');
    }
    else {
        await frame.click('body > form > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td.bttn1 > font > a');
    }
    //todo: add a flag if done to a list.
}
function getRandomNum() {
    return Math.random() * 200;
}