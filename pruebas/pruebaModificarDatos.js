var Browser = require("zombie");

var browser = new Browser({debug: true});

browser.visit("http://techbook.herokuapp.com/", function () {
    browser.fill("Usuario", "Zombie2");
    browser.fill("Contraseña", "cerebro");
    browser.pressButton("Entrar", function () {
        browser.clickLink("Mi cuenta", function () {
            browser.fill("nombre", "Pepito");
            browser.pressButton("Cambiar datos", function () {});
        });
    });
});
