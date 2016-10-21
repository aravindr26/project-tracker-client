/**
 * Created by aravind on 21/9/16.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  getData(key) {
     return localStorage.getItem(key);
  }
  setData(key, value) {
     localStorage.setItem(key, value)
  }
  removeData(key) {
      localStorage.removeItem(key);
  }
}
