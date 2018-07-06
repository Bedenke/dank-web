/// <reference types="superagent" />
import { Request } from "superagent";
export default class Fetch {
    private static dataCache;
    static data(filename: string): Promise<any>;
    static get(url: string): Request;
    static post(url: string): Request;
    static put(url: string): Request;
    static delete(url: string): Request;
}
