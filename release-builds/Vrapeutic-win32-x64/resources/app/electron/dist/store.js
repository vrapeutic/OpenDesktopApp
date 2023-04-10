"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = require("fs");
var request = require("request");
var unzipper = require("unzipper");
var path = require("path");
var http = require("http");
var rimraf = require("rimraf");
var Store = /** @class */ (function () {
    function Store(opts) {
        this.self = this;
        this.STORE_EVENTS = {
            all_users_list_changed: 'all-users-list-changed',
        };
        // Renderer process has to get `app` module via `remote.app`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        this.log = opts.logMsg;
        this.sendEvToWin = opts.sendEvToWin;
        this.userDataPath = electron_1.app.getPath('userData');
        console.log('userDataPath', this.userDataPath);
        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
        this.configPath = path.join(this.userDataPath, opts.configName + '.json');
        console.log('configPath', this.configPath);
        this.data = this.parseDataFile(this.configPath, opts.defaults);
        this.log("Saved Data is loaded... " + JSON.stringify(this.data));
    }
    // This will just return the property on the `data` object
    Store.prototype.get = function (key) {
        return this.data[key];
    };
    // ...and this will set it
    Store.prototype.set = function (key, val) {
        this.data[key] = val;
        // Wait, I thought using the node.js' synchronous APIs was bad form?
        // We're not writing a server so there's not nearly the same IO demand on the process
        // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
        // we might lose that data. Note that in a real app, we would try/catch this.
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.data));
        }
        catch (err) {
            console.log(err);
        }
    };
    Store.prototype.getAllKeys = function () {
        return Object.keys(this.data);
    };
    Store.prototype.getAllValues = function () {
        return Object.values(this.data);
    };
    Store.prototype.resetDefaults = function (defaults) {
        this.data = defaults;
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.data));
        }
        catch (err) {
            console.log(err);
        }
    };
    Store.prototype.writeUserFile = function (filePath, data) {
        var userFilePath = path.join(this.userDataPath, filePath);
        fs.writeFileSync(userFilePath, JSON.stringify(data));
    };
    Store.prototype.getUsersEmails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersEmailsFilePath, data, users, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersEmailsFilePath = path.join(this.userDataPath, 'allUsers.json');
                        if (!fs.existsSync(usersEmailsFilePath)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.promises.readFile(usersEmailsFilePath, 'utf-8')];
                    case 2:
                        data = _a.sent();
                        users = JSON.parse(data);
                        console.log('all users', users);
                        console.log('SENDING', this.STORE_EVENTS.all_users_list_changed);
                        this.sendEvToWin(this.STORE_EVENTS.all_users_list_changed, users);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.addUserToFile = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var usersEmailsFilePath, data, users, err_2, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersEmailsFilePath = path.join(this.userDataPath, 'allUsers.json');
                        if (!fs.existsSync(usersEmailsFilePath)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.promises.readFile(usersEmailsFilePath, 'utf-8')];
                    case 2:
                        data = _a.sent();
                        users = JSON.parse(data);
                        console.log('before checking', users);
                        if (!users.some(function (e) { return e.email === userEmail; })) {
                            users.push({
                                email: userEmail
                            }); //add some data
                            console.log('after adding', users);
                            this.sendEvToWin(this.STORE_EVENTS.all_users_list_changed, users);
                            fs.writeFile(usersEmailsFilePath, JSON.stringify(users), 'utf8', function () {
                                console.log('done');
                            }); // write it back 
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        users = [
                            {
                                email: userEmail,
                            }
                        ];
                        fs.writeFile(usersEmailsFilePath, JSON.stringify(users), 'utf8', function () {
                            console.log('done');
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.getFullUserFilePath = function (filePath) {
        return path.join(this.userDataPath, filePath);
    };
    Store.prototype.downloadV2 = function (url, dest, options, ext) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (ext === void 0) { ext = 'zip'; }
        var destPath = path.join(this.userDataPath, (dest + '.' + ext));
        try {
            this.ensureDirExist(destPath);
            this.log("Try Downloading... " + destPath, 'info');
            var file_1 = fs.createWriteStream(destPath, { mode: 511 });
            file_1.on('open', function (fd) {
                request.get({
                    url: url,
                })
                    .on('response', function (res) {
                    if (options.responseCB) {
                        options.responseCB(res, options.cbOptions);
                    }
                })
                    .on('error', function (err) {
                    if (err.code === 'ETIMEDOUT') {
                        console.log("Timeout!");
                    }
                    destPath = null;
                    console.log('error happened', err);
                    _this.log("Downloading request Error... " + JSON.stringify(err), 'error');
                    _this.removeFile(dest); // Delete the file async. (But we don't check the result)
                    if (options.cb) {
                        options.cb(false, options.cbOptions);
                    }
                })
                    .pipe(file_1);
            });
            file_1.on('finish', function () {
                _this.log("Downloading Done... " + destPath, 'info');
                file_1.on('close', function () {
                    if (options.cb) {
                        options.cb(destPath, options.cbOptions);
                    }
                });
                file_1.close(); // close() is async, call cb after close completes.
            });
            return destPath;
        }
        catch (err) {
            destPath = null;
            console.log('error happened', err);
            this.log("Downloading Error... " + JSON.stringify(err));
            if (options.cb) {
                options.cb(false, options.cbOptions);
            }
        }
    };
    Store.prototype.download = function (url, dest, options, ext) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (ext === void 0) { ext = 'zip'; }
        var destPath = path.join(this.userDataPath, (dest + '.' + ext));
        try {
            this.ensureDirExist(destPath);
            this.log("Try Downloading... " + destPath, 'info');
            var file_2 = fs.createWriteStream(destPath, { mode: 511 });
            // You shouldn't call write on your tempFile write stream until you've received the 'open' event from the stream.
            // The file won't exist until you see that event.
            file_2.on('open', function (fd) {
                var req = http.get(url, function (response) {
                    response.pipe(file_2);
                    if (options.responseCB) {
                        options.responseCB(response, options.cbOptions);
                    }
                    file_2.on('finish', function () {
                        _this.log("Downloading Done... " + destPath, 'info');
                        file_2.on('close', function () {
                            if (options.cb) {
                                options.cb(destPath, options.cbOptions);
                            }
                        });
                        file_2.close(); // close() is async, call cb after close completes.
                    });
                }).on('error', function (err) {
                    destPath = null;
                    console.log('error happened', err);
                    _this.log("Downloading request Error... " + JSON.stringify(err), 'error');
                    _this.removeFile(dest); // Delete the file async. (But we don't check the result)
                    if (options.cb) {
                        options.cb(false, options.cbOptions);
                    }
                }).on('end', function (en) {
                    console.log('req end...', en);
                }).on('abort', function (en) {
                    console.log('req abort...', en);
                }).on('timeout', function (en) {
                    console.log('req timeout...', en);
                });
            });
            return destPath;
        }
        catch (err) {
            destPath = null;
            console.log('error happened', err);
            this.log("Downloading Error... " + JSON.stringify(err));
            if (options.cb) {
                options.cb(false, options.cbOptions);
            }
        }
    };
    Store.prototype.unzipFile = function (targetFile, options) {
        if (options === void 0) { options = {}; }
        var dist = options.dist || path.dirname(targetFile);
        fs.createReadStream(targetFile)
            .pipe(unzipper.Extract({ path: dist }))
            .on('close', function () {
            if (options.cb) {
                options.cb(dist, options.cbOptions);
            }
        }).on('error', function () {
            if (options.cb) {
                options.cb(false, options.cbOptions);
            }
        });
    };
    Store.prototype.ensureDirExist = function (filePath) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    };
    Store.prototype.removeDir = function (dirName) {
        var dirPath = path.join(this.userDataPath, dirName);
        rimraf.sync(dirPath);
    };
    Store.prototype.moveDir = function (oldPath, newPath) {
        fs.renameSync(oldPath, newPath);
    };
    Store.prototype.removeFile = function (filePath) {
        fs.unlink(filePath, this.log); // Delete the file async. (But we don't check the result)
    };
    Store.prototype.parseDataFile = function (filePath, defaults) {
        // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
        // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
        this.log("Will try to load Data... " + filePath);
        try {
            var content = fs.readFileSync(filePath);
            return JSON.parse(content);
        }
        catch (error) {
            // if there was some kind of error, return the passed in defaults instead.
            this.log("File not found... " + filePath, 'debug');
            return defaults;
        }
    };
    return Store;
}());
// expose the class
module.exports.Store = Store;
//# sourceMappingURL=store.js.map