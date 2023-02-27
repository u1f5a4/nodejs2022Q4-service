import * as path from 'node:path';
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
dotenv.config();

export class Logger {
  level: string[];
  whereToWrite: string[];
  maxLogSize: number;
  folder: string;

  constructor() {
    this.level = process.env.LOG_LEVEL.split(',');
    this.whereToWrite = process.env.LOG_TO_WHERE.split(',');
    this.maxLogSize = Number(process.env.LOG_MAX_SIZE_KB);
    this.folder = path.normalize(process.env.LOG_FOLDER_PATH);
    console.log('Logger initialized');
    console.log(`Log level: ${this.level}`);
    console.log(`Log to write: ${this.whereToWrite}`);
    console.log(`Log max size: ${this.maxLogSize} KB`);
    console.log(`Log folder: ${this.folder}`);

    // create folder if not exists
    if (!fs.existsSync(this.folder)) fs.mkdirSync(this.folder);
  }

  send(level: string, message: string) {
    if (this.level.includes(level.toLowerCase()))
      this.write(`${new Date().toLocaleTimeString()} ${level} ${message}\n`);
  }

  write(message: string) {
    const files = fs.readdirSync(this.folder);
    const lastFile = files
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .at(-1);

    const isLastFileTooBig = lastFile
      ? fs.statSync(path.join(this.folder, lastFile)).size / 1024 >=
        this.maxLogSize
      : false;

    if (!lastFile || isLastFileTooBig) {
      const newFile = `${new Date().toISOString()}.log`;
      fs.writeFileSync(path.join(this.folder, newFile), message);
    } else {
      fs.appendFileSync(path.join(this.folder, lastFile), message);
    }
  }
}

export const logger = new Logger();
