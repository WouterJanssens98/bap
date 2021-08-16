"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBDatabase {
    // private shoes: Array<IShoe>;
    // private members: Array<IMember>;
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
        // this.shoes = [];
        // this.members = [];
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongoose_1.default
                .connect(this.config.mongoDBConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
                .then(data => {
                this.db = mongoose_1.default.connection;
                this.logger.info('Connected to the mongodb database', {});
                resolve(true);
            })
                .catch(error => {
                this.logger.error("Can't connect to the database", error);
                reject(error);
            });
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.db
                .close(true)
                .then(data => {
                resolve(data);
            })
                .catch(error => {
                this.logger.error("Can't disconnect the database", error);
                reject(error);
            });
        });
    }
}
exports.default = MongoDBDatabase;
//# sourceMappingURL=MongoDBDatabase.js.map