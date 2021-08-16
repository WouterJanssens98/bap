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
exports.ritSchema = exports.Rit = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ritSchema = new mongoose_1.Schema({
    info: {
        name: { type: String, required: true, unique: true, max: 128 },
        distance: { type: Number, required: true, unique: false, max: 750 },
        region: { type: String, required: true, unique: false, max: 128 },
        firstedition: { type: Number, required: true, unique: false, max: 2020 },
        type: { type: String, required: true, unique: false, max: 1000 },
        description: { type: String, required: true, unique: true, max: 1000 },
    },
    media: {
        bannerPicture: { type: String, required: true, unique: true, max: 128 },
        firstPicture: { type: String, required: true, unique: true, max: 128 },
        secondPicture: { type: String, required: true, unique: true, max: 128 },
        thirdPicture: { type: String, required: true, unique: true, max: 128 },
    },
    victories: {
        one: {
            victoryOneRider: { type: String, required: true, unique: false, max: 128 },
            victoryOneAmount: { type: Number, required: true, unique: false, max: 128 },
            victoryOneTeam: { type: String, required: true, unique: false, max: 128 },
        },
        two: {
            victoryTwoRider: { type: String, required: true, unique: false, max: 128 },
            victoryTwoAmount: { type: Number, required: true, unique: false, max: 128 },
            victoryTwoTeam: { type: String, required: true, unique: false, max: 128 },
        },
        three: {
            victoryThreeRider: { type: String, required: true, unique: false, max: 128 },
            victoryThreeAmount: { type: Number, required: true, unique: false, max: 128 },
            victoryThreeTeam: { type: String, required: true, unique: false, max: 128 },
        },
        four: {
            victoryFourRider: { type: String, required: true, unique: false, max: 128 },
            victoryFourAmount: { type: Number, required: true, unique: false, max: 128 },
            victoryFourTeam: { type: String, required: true, unique: false, max: 128 },
        },
        five: {
            victoryFiveRider: { type: String, required: true, unique: false, max: 128 },
            victoryFiveAmount: { type: Number, required: true, unique: false, max: 128 },
            victoryFiveTeam: { type: String, required: true, unique: false, max: 128 },
        }
    },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.ritSchema = ritSchema;
const Rit = mongoose_1.default.model('Rit', ritSchema);
exports.Rit = Rit;
//# sourceMappingURL=rit.model.js.map