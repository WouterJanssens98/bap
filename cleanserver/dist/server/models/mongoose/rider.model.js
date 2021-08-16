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
exports.riderSchema = exports.Rider = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const riderSchema = new mongoose_1.Schema({
    info: {
        name: { type: String, required: true, unique: true, max: 128 },
        nickname: { type: String, required: true, unique: true, max: 128 },
        placeofbirth: { type: String, required: true, unique: false, max: 128 },
        startCareer: { type: String, required: true, unique: false, max: 2020 },
        endCareer: { type: String, required: true, unique: false, max: 2020 },
        dateofbirth: { type: String, required: true, unique: false, max: 128 },
        youth: { type: String, required: true, unique: true, max: 1000 },
        career: { type: String, required: true, unique: true, max: 1000 },
        aftercareer: { type: String, required: true, unique: true, max: 1000 },
        periode: { type: String, required: true, unique: false, max: 256 }
    },
    media: {
        profilePicture: { type: String, required: true, unique: false, max: 128 },
        bannerPicture: { type: String, required: true, unique: false, max: 128 },
        youthPicture: { type: Array, required: true, unique: false, max: 500 },
        careerPicture: { type: Array, required: true, unique: false, max: 500 },
        afterCareerPicture: { type: Array, required: true, unique: false, max: 500 },
        audioURLYouth: { type: String, required: true, unique: false, max: 128 },
        audioURLCareer: { type: String, required: true, unique: false, max: 128 },
        audioURLAfterCareer: { type: String, required: true, unique: false, max: 128 },
    },
    victories: {
        one: {
            victoryOneYear: { type: Number, required: true, unique: false, max: 2020 },
            victoryOneRide: { type: String, required: true, unique: false, max: 128 },
            victoryOneTeam: { type: String, required: true, unique: false, max: 128 },
        },
        two: {
            victoryTwoYear: { type: Number, required: true, unique: false, max: 2020 },
            victoryTwoRide: { type: String, required: true, unique: false, max: 128 },
            victoryTwoTeam: { type: String, required: true, unique: false, max: 128 },
        },
        three: {
            victoryThreeYear: { type: Number, required: true, unique: false, max: 2020 },
            victoryThreeRide: { type: String, required: true, unique: false, max: 128 },
            victoryThreeTeam: { type: String, required: true, unique: false, max: 128 },
        },
        four: {
            victoryFourYear: { type: Number, required: true, unique: false, max: 2020 },
            victoryFourRide: { type: String, required: true, unique: false, max: 128 },
            victoryFourTeam: { type: String, required: true, unique: false, max: 128 },
        },
        five: {
            victoryFiveYear: { type: Number, required: true, unique: false, max: 2020 },
            victoryFiveRide: { type: String, required: true, unique: false, max: 128 },
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
exports.riderSchema = riderSchema;
const Rider = mongoose_1.default.model('Rider', riderSchema);
exports.Rider = Rider;
//# sourceMappingURL=rider.model.js.map