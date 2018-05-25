import fs from "fs";
import path from "path";
import superagent, { Request } from "superagent";

export default class Fetch {
  
  private static dataCache: { [key: string]: any } = {};

  static async data(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.dataCache[filename]) {
        return resolve(this.dataCache[filename]);
      }
      fs.readFile(filename, (err, res) => {
        if (err) return reject(err);
        const data = JSON.parse(res.toString());
        this.dataCache[filename] = data;
        resolve(data);
      });
    });
  }

  static get(url: string): Request {
    return superagent.get(url);
  }

  static post(url: string): Request {
    return superagent.post(url);
  }

  static put(url: string): Request {
    return superagent.put(url);
  }

  static delete(url: string): Request {
    return superagent.delete(url);
  }
}