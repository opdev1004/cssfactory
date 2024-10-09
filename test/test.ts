import CSSFactory from "../src/index";
import * as path from "path";

const configpath = path.resolve(__dirname, "./cssfactory-config.json");
const cssfactory = new CSSFactory(configpath);
cssfactory.combineCSS();
