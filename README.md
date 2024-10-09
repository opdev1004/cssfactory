# 🏭 CSS Factory

Simple CSS Library Generation Tool

## 🤔 Background

Building CSS libaray is bothersome. So I have built this tool to provide CSS libraries development environment. Just put css files in directories and build with configuration. The most simple way to build CSS library!

## 📢 Notice

### 👍 Releasing 0.0.1

Have a look at test directory of repo for use.

## ▶️ Installation

Install with a boilerplate project

```
npm create cssfactory@latest
```

Manually using it from your project:

```
npm i @opdev1004/cssfactory@latest
```

or

```
npm i -D @opdev1004/cssfactory@latest
```

## 📖 Example

cssfactory-config.json:

```
{
  "main": {
    "rootDirs": ["./src/common", "./src/pages"],
    "outDir": "./dist/"
  },
  "theme": {
    "rootDirs": ["./src/themes/dark", "./src/themes/light"],
    "outDir": "./dist/"
  }
}
```

index.ts:

```
import { CSSFactory } from "cssfactory";
import * as path from "path";

const configpath = path.resolve(__dirname, "./cssfactory-config.json");
const cssfactory = new CSSFactory(configpath);
cssfactory.combineCSS();
```

node.js:

```
const CSSFactory = require("cssfactory");
const path = require("path");

const configpath = path.resolve(__dirname, "./cssfactory-config.json");

const cssfactory = new CSSFactory.CSSFactory(configpath);
cssfactory.combineCSS();

```

## 💪 Support CSS Factory!

### 👼 Become a Sponsor

- [Ko-fi](https://ko-fi.com/opdev1004)
- [Github sponsor page](https://github.com/sponsors/opdev1004)

## 👨‍💻 Author

[Victor Chanil Park](https://github.com/opdev1004)

## 💯 License

MIT, See [LICENSE](./LICENSE).
