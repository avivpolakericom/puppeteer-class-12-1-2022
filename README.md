# puppeteer-class-12-1-2022

### Puppeteer is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. <br />It can also be configured to use full (non-headless) Chrome or Chromium.



## <ins>getting started</ins>
<b>1</b> 
install puppeteer: npm i puppeteer <br />
this might take longer than usual because this is quite a heavy package, that downloads its own version of chrome.

<b>2</b> 
to start a new broweser => const browser = await puppeteer.launch(); <br />
to open a new page => const page = await browser.newPage();

<b>3</b>
go to an url => await page.goto(url); 

<b>4</b>
now you can interact with the webpage using puppeteers many useful methods such as: <br />
<ins>click</ins> <br />
<ins>type</ins> <br />
<ins>keyboar.press</ins> <br />
and others <br />

<b>5</b>
to extract data from the webpage you could use the page.evaluate method <br />
which accepts a callback function. <br />
not that the argumnets to this function are passed after the callback function was defined.<br />
you could also take snapshots of the webpage using page.screenshots method which recieves an object with the desired path of the file to store the images. <br />
this file needs to end with .png 

<b>6</b>
puppeteer is easily integratable with jest, you could use it for e2e testing, in many different ways and patterns.
