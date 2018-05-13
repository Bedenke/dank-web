import fs from "fs";
import path from "path";

export class RequestContext {
  url: string = "";
  path: string = "";
  query?: any;
  params?: any;
}

export interface ContextData {
  dataDirectory: string;
  global?: any;
  request: RequestContext;
}

export class Context {
  private contextData: ContextData;

  constructor(contextData: ContextData) {
    this.contextData = contextData;
  }

  request(): RequestContext {
    return this.contextData.request;
  }

  global(key: string) {
    const path = key.split(".");
    let node = this.contextData.global;
    for (let item of path) {
      if (!node) return;
      node = node[item];
    }
    return node;
  }

  async data(dataPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(this.contextData.dataDirectory, dataPath),
        (err, res) => {
          if (err) return reject(err);
          resolve(JSON.parse(res.toString()));
        }
      );
    });
  }
}
