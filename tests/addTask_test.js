Feature('add task test');

Scenario('add task', (I) => {
    I.amOnPage('http://todomvc.com/examples/emberjs/');
    I.seeElement('//input[@id=\'new-todo\']');
    I.fillField('//input[@id=\'new-todo\']','new task');
    I.pressKey("Enter");
    I.seeElement('//div[@class=\'view\']/label[contains(text(), \'new task\')]');
});


const strangeStrings = new DataTable(['text']);
strangeStrings.add(['¯\\_(ツ)_/¯']);
strangeStrings.add(['hasOwnProperty']);

Data(strangeStrings).Scenario('strange strings', (I, current) => {
    I.amOnPage('http://todomvc.com/examples/emberjs/');
    I.seeElement('//input[@id=\'new-todo\']');
    I.fillField('//input[@id=\'new-todo\']', current.text);
    I.pressKey("Enter");
    I.see('1 item left');
})