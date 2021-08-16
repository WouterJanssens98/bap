"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodeSchema = exports.Periode = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const periodeSchema = new mongoose_1.Schema({
    start: { type: Number, required: true, unique: false, max: 2030 },
    end: { type: Number, required: true, unique: false, max: 2030 },
    description: { type: String, required: true, unique: false, max: 2030 },
    bannerImage: { type: String, required: true, unique: false, max: 128 },
    audioURL: { type: String, required: true, unique: false, max: 128 },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.periodeSchema = periodeSchema;
const Periode = mongoose_1.default.model('Periode', periodeSchema);
exports.Periode = Periode;
//# sourceMappingURL=periode.model.js.map