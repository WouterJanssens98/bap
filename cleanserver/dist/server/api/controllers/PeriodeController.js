"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../../models/mongoose");
const utilities_1 = require("../../utilities");
class PeriodeController {
    constructor() {
        this.index = async (req, res, next) => {
            const periodes = await mongoose_1.Periode.find().exec();
            return res.status(200).json(periodes);
        };
        this.create = async (req, res, next) => {
            try {
                const periodeCreate = new mongoose_1.Periode({
                    start: req.body.data.info.start,
                    end: req.body.data.info.end,
                    description: req.body.data.info.description,
                    bannerImage: req.body.data.info.bannerImage,
                    audioURL: req.body.data.info.audioURL,
                    author: req.body.author,
                    authorMail: req.body.authorMail,
                });
                const periode = await periodeCreate.save();
                return res.status(201).json(periode);
            }
            catch (err) {
                next(err);
            }
        };
        this.show = async (req, res, next) => {
            const { id } = req.params;
            const periode = await mongoose_1.Periode.findById(id);
            // .populate({
            //   path : 'values',
            //   populate : {
            //     path : 'shoe'
            //   }
            // })
            // .exec();
            return res.status(200).json(periode);
        };
        this.showPortfolioFromUserID = async (req, res, next) => {
            try {
                const { id } = req.params;
                const portfolio = await mongoose_1.Periode.find({ "referredUser": id })
                    .populate({
                    path: 'values',
                    populate: {
                        path: 'shoe'
                    }
                })
                    .exec();
                return res.status(200).json(portfolio);
            }
            catch (err) {
                next(err);
            }
        };
        this.update = async (req, res, next) => {
            const { id } = req.params;
            try {
                const portfolioUpdate = {
                    totalWorth: req.body.totalWorth,
                    totalItems: req.body.totalItems,
                };
                // TO DO eventueel berekeningen in backend doen
                const portfolio = await mongoose_1.Periode.findOneAndUpdate({ _id: id }, portfolioUpdate, {
                    new: true,
                }).exec();
                if (!portfolio) {
                    throw new utilities_1.NotFoundError();
                }
                return res.status(200).json(portfolio);
            }
            catch (err) {
                next(err);
            }
        };
        this.store = async (req, res, next) => {
            const { id } = req.params;
            try {
                const portfolioCreate = new mongoose_1.Periode({
                    referredUser: id
                });
                const portfolio = await portfolioCreate.save();
                return res.status(201).json(portfolio);
            }
            catch (err) {
                next(err);
            }
        };
        this.add = async (req, res, next) => {
            const { id } = req.params;
            const user = req.body.referredUser;
            const portfolio = await mongoose_1.Periode.update({ "referredUser": user }, { $push: {
                    referredValues: id
                } });
            return res.status(201).json(portfolio);
        };
    }
}
exports.default = PeriodeController;
//# sourceMappingURL=PeriodeController.js.map