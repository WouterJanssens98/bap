"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../../models/mongoose");
class ScoreController {
    constructor() {
        this.index = async (req, res, next) => {
            const riders = await mongoose_1.Score.find().exec();
            return res.status(200).json(riders);
        };
        this.create = async (req, res, next) => {
            try {
                const scoreCreate = new mongoose_1.Score({
                    score: req.body.data.score,
                    name: req.body.data.name,
                    location: req.body.data.location,
                    age: req.body.data.age,
                });
                const createdScore = await scoreCreate.save();
                return res.status(201).json(createdScore);
            }
            catch (err) {
                next(err);
            }
        };
        this.show = async (req, res, next) => {
            const { id } = req.params;
            const periode = await mongoose_1.Score.findById(id);
            return res.status(200).json(periode);
        };
    }
}
exports.default = ScoreController;
//# sourceMappingURL=ScoreController.js.map