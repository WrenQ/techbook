var Browser = require("zombie");
var assert = require("assert");

browser = new Browser({ debug: true });

browser.visit("http://techbook.herokuapp.com/", function () {
    browser.clickLink("Windows Phone", function () {});
});
