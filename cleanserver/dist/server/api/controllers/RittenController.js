"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../../models/mongoose");
const utilities_1 = require("../../utilities");
class RittenController {
    constructor() {
        this.index = async (req, res, next) => {
            const riders = await mongoose_1.Rit.find().exec();
            return res.status(200).json(riders);
        };
        this.create = async (req, res, next) => {
            try {
                const ritCreate = new mongoose_1.Rit({
                    author: req.body.author,
                    authorMail: req.body.authorMail,
                    info: {
                        name: req.body.data.info.name,
                        distance: req.body.data.info.distance,
                        region: req.body.data.info.region,
                        firstedition: req.body.data.info.firstedition,
                        type: req.body.data.info.type,
                        description: req.body.data.info.description,
                    },
                    media: {
                        bannerPicture: req.body.data.media.bannerPicture,
                        firstPicture: req.body.data.media.firstPicture,
                        secondPicture: req.body.data.media.secondPicture,
                        thirdPicture: req.body.data.media.thirdPicture,
                    },
                    victories: {
                        one: {
                            victoryOneRider: req.body.data.victories.one.rider,
                            victoryOneAmount: req.body.data.victories.one.amount,
                            victoryOneTeam: req.body.data.victories.one.team,
                        },
                        two: {
                            victoryTwoRider: req.body.data.victories.two.rider,
                            victoryTwoAmount: req.body.data.victories.two.amount,
                            victoryTwoTeam: req.body.data.victories.two.team,
                        },
                        three: {
                            victoryThreeRider: req.body.data.victories.three.rider,
                            victoryThreeAmount: req.body.data.victories.three.amount,
                            victoryThreeTeam: req.body.data.victories.three.team,
                        },
                        four: {
                            victoryFourRider: req.body.data.victories.four.rider,
                            victoryFourAmount: req.body.data.victories.four.amount,
                            victoryFourTeam: req.body.data.victories.four.team,
                        },
                        five: {
                            victoryFiveRider: req.body.data.victories.five.rider,
                            victoryFiveAmount: req.body.data.victories.five.amount,
                            victoryFiveTeam: req.body.data.victories.five.team
                        }
                    },
                });
                const createdRide = await ritCreate.save();
                return res.status(201).json(createdRide);
            }
            catch (err) {
                next(err);
            }
        };
        this.show = async (req, res, next) => {
            const { id } = req.params;
            const periode = await mongoose_1.Rit.findById(id);
            // .populate({
            //   path : 'values',
            //   populate : {
            //     path : 'shoe'
            //   }
            // })
            // .exec();
            return res.status(200).json(periode);
        };
        this.showAll = async (req, res, next) => {
            const rit = await mongoose_1.Rit.find().exec();
            // .populate({
            //   path : 'values',
            //   populate : {
            //     path : 'shoe'
            //   }
            // })
            // .exec();
            return res.status(200).json(rit);
        };
        this.update = async (req, res, next) => {
            const { id } = req.params;
            try {
                const portfolioUpdate = {
                    totalWorth: req.body.totalWorth,
                    totalItems: req.body.totalItems,
                };
                // TO DO eventueel berekeningen in backend doen
                const portfolio = await mongoose_1.Rit.findOneAndUpdate({ _id: id }, portfolioUpdate, {
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
    }
}
exports.default = RittenController;
//# sourceMappingURL=RittenController.js.map