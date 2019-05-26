"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_json_1 = __importDefault(require("./post.json"));
const todo_json_1 = __importDefault(require("./todo.json"));
class DataStore {
}
DataStore.post = post_json_1.default;
DataStore.todo = todo_json_1.default;
exports.DataStore = DataStore;
