"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
require("@feathersjs/transport-commons");
const feathers_1 = __importDefault(require("@feathersjs/feathers"));
const express_1 = __importDefault(require("@feathersjs/express"));
const Storage_1 = require("./database/Storage");
const PlaceRestController_1 = require("./place/controller/PlaceRestController");
const PlaceRepository_1 = require("./place/repository/PlaceRepository");
async function runApp() {
    const appPort = 3030;
    const dbPath = (0, path_1.join)(__dirname, "../data/db.json");
    const placeStorage = new Storage_1.Storage(dbPath, "places");
    await placeStorage.read();
    const app = (0, express_1.default)((0, feathers_1.default)());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/", express_1.default.static("./public"));
    app.configure(express_1.default.rest());
    app.use("/places", new PlaceRestController_1.PlaceRestController(new PlaceRepository_1.PlaceRepository(placeStorage)));
    app.use(express_1.default.errorHandler());
    app.listen(appPort).on("listening", () => {
        console.log(`Server started ${appPort}`);
    });
    app.on("error", () => {
        console.log("Failed to start server.");
    });
}
runApp();
