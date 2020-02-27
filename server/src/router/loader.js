
import express from "express";
import fs from "fs";
import path from "path";
// let router = express.Router();
// let files = fs.readdirSync(path.resolve(__dirname, "../controller"));

// files
//     .filter(function (file, index) {
//         return file !== 'loader.js';
//     })
//     .forEach(function (file, index) {
//         console.log("file is ", file);
//         // var route = require('./' + file.replace('.js', ''));
//         // if (file === 'index.js') {
//         //     router.use('/', route);
//         // } else {
//         //     router.use('/api/' + file.replace('.js', ''), route);
//         // }
//     });

export const LoadController = (config) => {
    let router = express.Router();
    let controllerPath = path.resolve(__dirname, "../controller");
    const readFileList = (dir, filesList = []) => {
        const files = fs.readdirSync(dir);
        files.forEach((item, index) => {
            var fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                readFileList(path.join(dir, item), filesList);  //递归读取文件
            } else {
                filesList.push(fullPath);
            }
        });
        return filesList;
    }
    let filesList = [];
    let controllers = [], controller;
    readFileList(controllerPath, filesList);
    if (filesList.length) {
        filesList.forEach(f => {
            if (/\.controller\.js$/.test(f)) {
                try {
                    controller = {
                        obj: new (require(f))(config),
                        path: (f.replace(controllerPath, "").replace(/\\/g, "/").replace(".controller.js", ""))
                    };
                    var obj = controller.obj;
                    Object.getOwnPropertyNames(obj.__proto__).forEach(fc => {
                        if (fc != "constructor") {
                            console.log("registor", (controller.path + "/" + fc).toLowerCase());
                            router.use((config.apiPrefix + controller.path + "/" + fc).toLowerCase(), obj[fc]);
                        }

                    })
                } catch (e) {
                    console.log("init controller " + f + " failed", e)
                }
            }
        })
    }

    return router;
}
