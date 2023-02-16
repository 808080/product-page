import fs from 'fs';
import path from 'path';

const getJSONpath = (file: string) => path.join(process.cwd(), `data/${file}.json`);

export const readJSON = <T = any>(file: string): T | undefined => {
  const filePath = getJSONpath(file);

  try {
    const contents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(contents);
  } catch (err) {
    console.error(`Error reading ${filePath}`, err);
  }
};

export const rewriteJSON = <T = any>(file: string, json: T) => {
  const filePath = getJSONpath(file);

  try {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(`Error writing ${filePath}`, err);
  }
};