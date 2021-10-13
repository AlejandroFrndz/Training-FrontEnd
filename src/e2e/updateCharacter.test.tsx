import puppeteer from 'puppeteer';

describe('Update Character E2E', () => {
  jest.setTimeout(8000);
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  const characterID = 20;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('Kills the character and goes back to the list, wich shows the character dead', async () => {
    await page.goto('http://localhost:3001/characters');
    await page.waitForSelector(`#character_${characterID}`);
    await page.click(`#character_${characterID}`);
    await page.waitForSelector('#killButton');
    await page.click('#killButton');
    await page.click('#goBackButton');
    await page.waitForSelector(`#character_${characterID}_status`);
    const text = await page.$eval(
      `#character_${characterID}_status`,
      (e) => e.textContent
    );
    expect(text).toBe('Dead');
  });

  it('Revives the character who is then shown as alive once again', async () => {
    await page.waitForSelector(`#character_${characterID}`);
    await page.click(`#character_${characterID}`);
    await page.waitForSelector('#killButton');
    await page.click('#killButton');
    await page.click('#goBackButton');
    await page.waitForSelector(`#character_${characterID}_status`);
    const text = await page.$eval(
      `#character_${characterID}_status`,
      (e) => e.textContent
    );
    expect(text).toBe('Alive');
  });

  afterAll(() => browser.close());
});
