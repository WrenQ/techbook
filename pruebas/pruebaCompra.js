var Browser = require("zombie");
var assert = require("assert");

browser = new Browser({debug: true});

browser.visit("http://techbook.herokuapp.com/", function () {
    browser.fill("Usuario", "Zombie2");
    browser.fill("Contraseña", "cerebro");
    browser.pressButton("Entrar", function () {
        browser.clickLink("Android", function () {
            browser.visit("http://techbook.herokuapp.com/catalogo/Galaxy%20Note%20III", function () {
                browser.clickLink("Comprar: <%= art.art_pvp %> €", function () {});
            });
        });
    });
});