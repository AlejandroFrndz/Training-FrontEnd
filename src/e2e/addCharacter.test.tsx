import puppeteer from 'puppeteer';
import CharacterService from '../services/characters.service';

describe('Add Character E2E', () => {
  jest.setTimeout(8000);
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  const characterID = 1252;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('Navigates to Add Character page', async () => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('#toAdd');
    await page.click('#toAdd');
    await page.waitForSelector('#addCharacterForm');
    const classes = await page.$eval('#toAdd', (e) => e.classList);
    expect(classes[6]).toBe('styles_active__15guF');
  });

  it('Fills and submits the form and gets back to characters page', async () => {
    await page.click('#name');
    await page.type('#name', 'Bill');

    await page.click('#Alive');

    const speciesInput = await page.$('#species');
    await speciesInput?.click({ clickCount: 3 });
    await speciesInput?.type('Human');

    await page.click('#male');

    await page.click('#image');
    await page.type(
      '#image',
      'https://rickandmortyapi.com/api/character/avatar/45.jpeg'
    );

    await page.click('#submitButton');

    await page.waitForSelector('#toCharacters');
    const classes = await page.$eval('#toCharacters', (e) => e.classList);
    expect(classes[5]).toBe('styles_active__15guF');
  });

  it('Shows the newly created character in the list', async () => {
    const character = await page.$(`#character_${characterID}`);
    expect(character).toBeTruthy();
  });

  afterAll(async () => {
    await CharacterService.delete(characterID);
    browser.close();
  });
});
