var Browser = require("zombie");
var assert = require("assert");

browser = new Browser({debug: true});

browser.visit("http://techbook.herokuapp.com/", function () {
    browser.fill("Usuario", "admin");
    browser.fill("Contraseña", "admin");
    browser.pressButton("Entrar", function () {
        browser.clickLink("Nuevo artículo", function () {
            
        });
    });
});