const puppeteer = require("puppeteer");

const carPrice = async (name) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 40 });
  const page = await browser.newPage();

  await page.goto("https://www.carzone.co.il/");
  await page.type(
    "#gatsby-focus-wrapper > header > div > div > div > div > input",
    name
  );
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  const price = await page.evaluate(() => {
    const priceElement = document.querySelector(
      "#gatsby-focus-wrapper > div.css-13tplzb.e1l23w9j5 > div > main > section:nth-child(2) > div > div > span:nth-child(1) > div > div.css-1eepllo.enfd39o2"
    );
    return priceElement.textContent;
  });
  await browser.close();
  console.log(price);
  return price;
};

carPrice("טויוטה קורולה");
