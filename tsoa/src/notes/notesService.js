"use strict";
/*
TODO:
typeorm uporaba
dependency injection: ko kličemo constructor->service, se ta service sam postavi. DepInj je tak mehanizem
princip: anotira se zadeve
ideja: postavi se kontainer npr iocContainter, se zadeve postavijo same
dependency injection je @Inject
za to potrebujemo še @Factory
*/
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
exports.NotesService = void 0;
var database_1 = require("./database");
var NotesService = /** @class */ (function () {
    function NotesService() {
    }
    NotesService.prototype.getNotes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        database_1.db.all(database_1.SQL_QUERY_NOTES, function (err, vals) {
                            if (err) {
                                console.log('reject');
                                reject('Error: get Notes query failed');
                                return;
                            }
                            console.log(vals);
                            resolve(vals);
                        });
                    })];
            });
        });
    };
    NotesService.prototype.findOneNote = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        database_1.db.get(database_1.SQL_FIND_DATA, [id], function (err, vals) {
                            if (err) {
                                console.log('reject', err);
                                reject('Error: get Notes query failed');
                                return;
                            }
                            console.log("VALS", vals);
                            resolve(vals);
                        });
                    })];
            });
        });
    };
    NotesService.prototype.insertNote = function (NoteInsertParam) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var today = NoteInsertParam.creation;
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                        var today2 = yyyy + '-' + mm + '-' + dd;
                        database_1.db.run(database_1.SQL_INSERT_DATA, [today2, NoteInsertParam.note], function (err, vals) {
                            if (err) {
                                console.log('reject', err);
                                reject('Error: insert Notes query failed');
                                return;
                            }
                            console.log("VALS insert", vals);
                            resolve(vals);
                        });
                    })];
            });
        });
    };
    NotesService.prototype.updateNote = function (NoteUpdateParam) {
        return new Promise(function (resolve, reject) {
            var today = NoteUpdateParam.creation;
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var UpdateDate = yyyy + '-' + mm + '-' + dd;
            database_1.db.run(database_1.SQL_UPDATE_DATA, [NoteUpdateParam.note, UpdateDate, NoteUpdateParam.id], function (err, vals) {
                if (err) {
                    console.log('reject', err);
                    reject('Error: update Note query failed');
                    return;
                }
                console.log("VALS", vals);
                resolve(vals);
            });
        });
    };
    NotesService.prototype.deleteNote = function (NoteDeleteParam) {
        return new Promise(function (resolve, reject) {
            database_1.db.get(database_1.SQL_DELETE_DATA, NoteDeleteParam.id, function (err, vals) {
                if (err) {
                    console.log('reject', err);
                    reject('Error: delete Note query failed');
                    return;
                }
                console.log("DeleteNote", vals);
                resolve(vals);
            });
        });
    };
    return NotesService;
}());
exports.NotesService = NotesService;
