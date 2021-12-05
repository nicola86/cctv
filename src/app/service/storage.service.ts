import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private encodestr = '-lsdfvadfgadfvcall'
    private encodeStart = 8

    constructor() { }
    set(key: any, value: any) {
        localStorage.setItem(key, this.crypt(value));
    }
    get(key: any) {
        let d: any = localStorage.getItem(key)
        return this.decrypt(d);
    }
    remove(key: any) {
        localStorage.removeItem(key);
    }
    crypt(data: any) {
        let str = JSON.stringify(data);
        let newstr = str.slice(0, this.encodeStart) + this.encodestr + str.slice(this.encodeStart)
        return btoa(encodeURIComponent(newstr))
        // return btoa(escape(JSON.stringify(data)))
    }
    decrypt(data: any) {
        let str = decodeURIComponent(atob(data))
        let newstr = str.slice(0, this.encodeStart) + str.slice(this.encodestr.length + this.encodeStart)
        return JSON.parse(newstr)
        // return JSON.parse(unescape(atob(data)))
    }
}