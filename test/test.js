const CSSFactory = require("../dist/index.js");
const path = require("path");

const configpath = path.resolve(__dirname, "./cssfactory-config.json");

const cssfactory = new CSSFactory.CSSFactory(configpath);
cssfactory.combineCSS();
