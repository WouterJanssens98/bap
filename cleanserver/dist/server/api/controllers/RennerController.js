"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../../models/mongoose");
const utilities_1 = require("../../utilities");
class RennerController {
    constructor() {
        this.index = async (req, res, next) => {
            const riders = await mongoose_1.Rider.find().exec();
            return res.status(200).json(riders);
        };
        this.create = async (req, res, next) => {
            try {
                const rennerCreate = new mongoose_1.Rider({
                    author: req.body.author,
                    authorMail: req.body.authorMail,
                    info: {
                        name: req.body.data.info.name,
                        nickname: req.body.data.info.nickname,
                        dateofbirth: req.body.data.info.dateofbirth,
                        placeofbirth: req.body.data.info.placeofbirth,
                        startCareer: req.body.data.info.startCareer,
                        endCareer: req.body.data.info.endCareer,
                        periode: req.body.data.info.periode,
                        youth: req.body.data.info.youth,
                        career: req.body.data.info.career,
                        aftercareer: req.body.data.info.aftercareer
                    },
                    media: {
                        profilePicture: req.body.data.media.profilePicture,
                        bannerPicture: req.body.data.media.bannerPicture,
                        youthPicture: req.body.data.media.youthPicture,
                        careerPicture: req.body.data.media.careerPicture,
                        afterCareerPicture: req.body.data.media.afterCareerPicture,
                        audioURLYouth: req.body.data.media.audioURLYouth,
                        audioURLCareer: req.body.data.media.audioURLCareer,
                        audioURLAfterCareer: req.body.data.media.audioURLAfterCareer,
                    },
                    victories: {
                        one: {
                            victoryOneYear: req.body.data.victories.one.year,
                            victoryOneRide: req.body.data.victories.one.ride,
                            victoryOneTeam: req.body.data.victories.one.team,
                        },
                        two: {
                            victoryTwoYear: req.body.data.victories.two.year,
                            victoryTwoRide: req.body.data.victories.two.ride,
                            victoryTwoTeam: req.body.data.victories.two.team,
                        },
                        three: {
                            victoryThreeYear: req.body.data.victories.three.year,
                            victoryThreeRide: req.body.data.victories.three.ride,
                            victoryThreeTeam: req.body.data.victories.three.team,
                        },
                        four: {
                            victoryFourYear: req.body.data.victories.four.year,
                            victoryFourRide: req.body.data.victories.four.ride,
                            victoryFourTeam: req.body.data.victories.four.team,
                        },
                        five: {
                            victoryFiveYear: req.body.data.victories.five.year,
                            victoryFiveRide: req.body.data.victories.five.ride,
                            victoryFiveTeam: req.body.data.victories.five.team
                        }
                    },
                });
                const createdRenner = await rennerCreate.save();
                return res.status(201).json(createdRenner);
            }
            catch (err) {
                next(err);
            }
        };
        this.show = async (req, res, next) => {
            const { id } = req.params;
            const periode = await mongoose_1.Rider.findById(id);
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
            const periode = await mongoose_1.Rider.find().exec();
            // .populate({
            //   path : 'values',
            //   populate : {
            //     path : 'shoe'
            //   }
            // })
            // .exec();
            return res.status(200).json(periode);
        };
        this.showRidersFromPeriod = async (req, res, next) => {
            try {
                const { id } = req.params;
                const riders = await mongoose_1.Rider.find({ 'info.periode': id }).exec();
                return res.status(200).json(riders);
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
                const portfolio = await mongoose_1.Rider.findOneAndUpdate({ _id: id }, portfolioUpdate, {
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
exports.default = RennerController;
//# sourceMappingURL=RennerController.js.map