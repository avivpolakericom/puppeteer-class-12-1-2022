// import * as puppeteer from "puppeteer";

// const carPrice = async (carName: string) => {
//   // starting the browser and the page instance
//   // the launch method excepts an configuration object where you could set headless to false
//   // and set a slow motion interval
//   const browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 10,
//     args: ["--incognito"],
//   });
//   const page = await browser.newPage();

//   //
//   await page.goto("https://www.carzone.co.il/");
//   await page.screenshot({ path: "icarscreenshots.png" });
//   await page.type(
//     "#gatsby-focus-wrapper > header > div > div > div > div > input",
//     carName
//   );
//   await page.waitForTimeout(1000);
//   await page.keyboard.press("Enter");
//   await page.waitForNavigation();
//   const carPrice = await page.evaluate(() => {
//     const priceElement = document.querySelector(
//       "#gatsby-focus-wrapper > div.css-13tplzb.e1l23w9j5 > div > main > section:nth-child(2) > div > div > span:nth-child(1) > div > div.css-1eepllo.enfd39o2"
//     );
//     if (!(priceElement && typeof priceElement.textContent === "string")) {
//       return "could not find price";
//     }
//     return priceElement.textContent;
//   });
//   await browser.close();
//   return carPrice;
// };

// const displayPrice = async () => {
//   console.log(await carPrice("טויוטה קורולה"));
// };

// displayPrice();

// export default carPrice;
