/**
 * 文件操作
 * @module
 * @author vega <vegawong@126.com>
**/

// 'use strict';

import fs from 'fs';
import path from 'path';

const file = {

  has(uri) {
    return fs.existsSync(uri);
  },

  write(uri, content) {
    if (file.has(uri)) {
      fs.chmodSync(uri, '755');
    }
    fs.writeFileSync(uri, content, 'utf8');
  },

  read(uri, def) {
    if (file.has(uri) === false) {
      return def;
    }
    return fs.readFileSync(uri, 'utf8');
  },

  remove(uri) {
    if (file.has(uri)) {
      fs.chmodSync(uri, '755');
      fs.unlinkSync(uri);
    }
  },

  readJSON(uri, def) {
    let txt = file.read(uri, false);
    if (!txt) {
      return def;
    }
    txt = String(txt).replace(/[^:]\/\/.*"?[\r\n\r]/g, '');
    return JSON.parse(txt);
  },

  mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (this.mkdirSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
      return false;
    }
  }
}

export { file };
