import puppeteer from 'puppeteer';

describe('Delete Character E2E', () => {
  jest.setTimeout(8000);
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  const characterID = 30;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--lang=en']
    });
    page = await browser.newPage();
  });

  it('Navigates to characters page', async () => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('#toCharacters');
    await page.click('#toCharacters');
    await page.waitForSelector('.container');
    const classes = await page.$eval('#toCharacters', (e) => e.classList);
    expect(classes[5]).toBe('styles_active__15guF');
  });

  it('Navigates to character details page', async () => {
    await page.waitForSelector(`#character_${characterID}`);
    await page.click(`#character_${characterID}`);
    await page.waitForSelector('.character');
    const charName = await page.$eval(
      '.character',
      (e) => e.firstChild?.textContent
    );
    expect(charName).toBe('Name: Summer Smith');
  });

  it('Deletes the character and goes back to characters list', async () => {
    await page.waitForSelector('#deleteButton');
    await page.click('#deleteButton');
    await page.waitForTimeout(500); //Give time for the modal animation to take place completely
    await page.waitForSelector('.swal-button--confirm');
    await page.click('.swal-button--confirm');
    await page.waitForSelector('.container');
    const element = await page.evaluate((characterID) =>
      document.querySelector(`#character_${characterID}`)
    );
    expect(element).toBeFalsy();
  });

  afterAll(async () => {
    browser.close();
  });
});
