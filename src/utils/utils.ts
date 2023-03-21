interface IUtilites {
  checkFileExists(filepath: string, filename: string): boolean;
  readFileToString(filepath: string, filename: string): string;
  writeContentsToFile(
    filepath: string,
    filename: string,
    contents: string
  ): void;
}

 class Utilites implements IUtilites {

  constructor() {
    console.log("UTILs")
  }
  checkFileExists(filepath: string, filename: string): boolean {
    const { existsSync } = require("fs");
    const { join } = require("path");
    return existsSync(join(filepath, filename));
  }

  readFileToString(filepath: string, filename: string): string {
    const { readFileSync } = require("fs");
    const { join } = require("path");
    return readFileSync(join(filepath, filename), "utf-8");
  }

  writeContentsToFile(
    filepath: string,
    filename: string,
    contents: string
  ): void {
    const { writeFileSync } = require("fs");
    const { join } = require("path");
    writeFileSync(join(filepath, filename), contents, "utf-8");
  }
}
