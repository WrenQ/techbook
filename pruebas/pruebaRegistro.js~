var Browser = require("zombie");
var assert = require("assert");

browser = new Browser({ debug: true });

browser.visit("http://techbook.herokuapp.com/registro", function () {
    console.log("estoy en: " + browser.html());
    browser.fill("nombreUsuario", "Zombie2");
    browser.fill("clave", "cerebro");
    browser.fill("nombre", "Zombie2");
    browser.fill("apellidos", "Zombie2");
    browser.fill("mail", "soyunzombie2@gmail.com");
    browser.fill("direccion", "cementerio");
    
    browser.pressButton("Registrarse", function () {});
});