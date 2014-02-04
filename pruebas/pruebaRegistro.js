var Browser = require("zombie");
var assert = require("assert");

browser = new Browser();
browser.visit("http://localhost:3000/", function () {
    browser.fill("Usuario", "EArauz").fill("Contraseña", "12345").pressButton("Entrar", function () {
        assert.ok(browser.success);
        assert.equal(browser.text("title"), "Bienvenido");
    });
});
