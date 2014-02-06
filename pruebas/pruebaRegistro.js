var Browser = require("zombie");
var assert = require("assert");

browser = new Browser({ debug: true });

browser.visit("http://techbook.herokuapp.com/", function () {
    console.log("estoy en: " + browser.html());
    browser.clickLink("Nuevo Usuario", function () {});
    browser.fill("nombreUsuario", "Zombie");
    browser.fill("clave", "12345");
    browser.fill("nombre", "Zombie");
    browser.fill("apellidos", "Zombie");
    browser.fill("mail", "soyunzombie@gmail.com");
    browser.fill("direccion", "11003");
    
    browser.pressButton("Registrarse", function () {});
});

/*browser.visit("http://techbook.herokuapp.com/", function () {
    browser.fill("Usuario", "EArauz");
    browser.fill("Contraseña", "12345");
    browser.pressButton("Entrar", function () {});
});*/