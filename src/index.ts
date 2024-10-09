import * as fs from "fs";
import * as path from "path";

interface CSSConfig {
  [key: string]: {
    rootDirs: string[];
    outDir: string;
  };
}

export class CSSFactory {
  private config: CSSConfig = {};

  constructor(configPath: string = "") {
    if (configPath) {
      const ext = path.extname(configPath);
      if (![".json"].includes(ext)) {
        throw new Error("Invalid config file type. Must be .json");
      }

      this.config = this.setConfig(configPath);
    }
  }

  public setConfig(configPath: string): CSSConfig {
    const configContent = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(configContent);
  }

  private async readCSSFiles(rootDir: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(rootDir, (err: any, files: any) => {
        if (err) {
          return reject(err);
        }

        const cssFiles = files.filter((file: any) => file.endsWith(".css"));
        resolve(cssFiles.map((file: any) => path.join(rootDir, file)));
      });
    });
  }

  public async combineCSS() {
    for (const [cssFileName, { rootDirs, outDir }] of Object.entries(
      this.config
    )) {
      const allCssContents: string[] = [];

      for (const dir of rootDirs) {
        const cssFiles = await this.readCSSFiles(dir);
        for (const cssFile of cssFiles) {
          const content = fs.readFileSync(cssFile, "utf-8");
          allCssContents.push(content);
        }
      }

      const combinedCss = allCssContents.join("\n");
      const outputPath = path.join(outDir, `${cssFileName}.css`);
      fs.mkdirSync(outDir, { recursive: true }); // Ensure output directory exists
      fs.writeFileSync(outputPath, combinedCss);
      console.log(`CSS Factory written to ${outputPath}`);
    }
  }
}
