"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const superagent_1 = __importDefault(require("superagent"));
class Fetch {
    static data(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.dataCache[filename]) {
                    return resolve(this.dataCache[filename]);
                }
                fs_1.default.readFile(filename, (err, res) => {
                    if (err)
                        return reject(err);
                    const data = JSON.parse(res.toString());
                    this.dataCache[filename] = data;
                    resolve(data);
                });
            });
        });
    }
    static get(url) {
        return superagent_1.default.get(url);
    }
    static post(url) {
        return superagent_1.default.post(url);
    }
    static put(url) {
        return superagent_1.default.put(url);
    }
    static delete(url) {
        return superagent_1.default.delete(url);
    }
}
Fetch.dataCache = {};
exports.default = Fetch;
