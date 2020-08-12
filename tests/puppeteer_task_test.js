const puppeteer = require('puppeteer');
const assert = require('assert');

Feature('puppeteer add task test');

Before(async function () { // or Background
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    });
    page = await browser.newPage();
    await page.goto('http://todomvc.com/examples/emberjs/');
});

After(async function () { // or Background
    await browser.close();
});

Scenario('add task', async function () {
    await page.waitForSelector('#new-todo');
    await page.type('#new-todo', 'test task');
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "test task")]');
});

Scenario('add second task', async function () {
    await page.waitForSelector('#new-todo');
    await page.type('#new-todo', 'test task');
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "test task")]');
    const element = await page.$("#todo-count > strong");
    let text = await page.evaluate(element => element.textContent, element);
    assert.equal(text, 1);
    await page.waitForSelector('#new-todo');
    await page.type('#new-todo', 'test second task');
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "test second task")]');
    text = await page.evaluate(element => element.textContent, element);
    assert.equal(text, 2);
});

Scenario('remove task', async function () {
    await page.waitForSelector('#new-todo');
    await page.type('#new-todo', 'task for remove');
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "task for remove")]');
    await page.mouse.move(450, 205)
    await page.click('.destroy');
    await page.waitForSelector('#todo-count', { hidden: true })
});

Scenario('complete task', async function () {
    await page.waitForSelector('#new-todo');
    await page.type('#new-todo', 'task for complete');
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "task for complete")]');
    await page.click('.toggle');
    await page.waitForSelector('#clear-completed');
});

Scenario('edit task', async function () {
    await page.waitForSelector('#new-todo');
    await page.type('#new-todo', 'task for edit');
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "task for edit")]');
    await page.mouse.click(450, 205, { clickCount: 2 })
    await page.type('.edit', ' + new text')
    await page.keyboard.press('Enter');
    await page.waitForXPath('//label[contains(text(), "task for edit + new text")]');
});