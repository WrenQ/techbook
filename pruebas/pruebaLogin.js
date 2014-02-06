var Browser = require("zombie");
var assert = require("assert");

browser = new Browser({ debug: true });

browser.visit("http://techbook.herokuapp.com/", function () {
    browser.fill("Usuario", "EArauz");
    browser.fill("Contraseña", "12345");
    browser.pressButton("Entrar", function () {
        assert.ok(browser.success);
    });
    console.log("estoy en: " + browser.html());
});