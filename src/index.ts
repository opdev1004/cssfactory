import * as fs from "fs";
import * as path from "path";

interface CSSConfig {
  [key: string]: {
    rootDirs: string[];
    outDir?: string;
    includeChildDir?: boolean;
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

  private async readCSSFiles(
    rootDir: string,
    includeChildDir: boolean
  ): Promise<string[]> {
    const cssFiles: string[] = [];

    const readDirectory = (dir: string) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && includeChildDir) {
          readDirectory(filePath); // Recursive call for child directories
        } else if (file.endsWith(".css")) {
          cssFiles.push(filePath); // Add CSS file to the list
        }
      });
    };

    readDirectory(rootDir);
    return cssFiles;
  }

  public async combineCSS() {
    for (const [
      cssFileName,
      { rootDirs, outDir = "./dist/", includeChildDir = false },
    ] of Object.entries(this.config)) {
      const allCssContents: string[] = [];

      for (const dir of rootDirs) {
        const cssFiles = await this.readCSSFiles(dir, includeChildDir);
        for (const cssFile of cssFiles) {
          const content = fs.readFileSync(cssFile, "utf-8");
          allCssContents.push(content);
        }
      }

      const combinedCss = allCssContents.join("\n");
      const outputPath = path.join(outDir, `${cssFileName}.css`);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outputPath, combinedCss);
      console.log(`CSS Factory written to ${outputPath}`);
    }
  }
}
