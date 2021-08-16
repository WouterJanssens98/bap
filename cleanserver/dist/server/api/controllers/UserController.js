"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../../models/mongoose");
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const utilities_1 = require("../../utilities");
class UserController {
    constructor(config, authService) {
        // public index = async (
        //   req: Request,
        //   res: Response,
        //   next: NextFunction,
        // ): Promise<Response<any>> => {
        //   try {
        //     const { limit, skip } = req.query;
        //     let users = null;
        //     if (limit && skip) {
        //       const options = {
        //         page: parseInt(skip, 10) || 1,
        //         limit: parseInt(limit, 10) || 10,
        //         sort: { created_at: -1 },
        //       };
        //       users = await User.paginate({}, options);
        //     } else {
        //       users = await User.find()
        //         .sort({ created_at: -1 })
        //         .exec();
        //     }
        //     return res.status(200).json(users);
        //   } catch (err) {
        //     next(err);
        //   }
        // };
        this.show = async (req, res, next) => {
            try {
                const { id } = req.params;
                const post = await mongoose_1.User.findById(id).exec();
                return res.status(200).json(post);
            }
            catch (err) {
                next(err);
            }
        };
        // public upload = async (req: Request, res: Response, next: NextFunction) => {
        //   const storage = multer.diskStorage({
        //     destination : 'uploads/',
        //     filename: function (req, file, cb) {
        //       cb(null, file.originalname);
        //     }
        //   });
        //   const upload = multer({ storage: storage });
        //   try {
        //     const { id } = req.params;
        //     const post = await User.findById(id).exec();
        //     return res.status(200).json(post);
        //   } catch (err) {
        //     next(err);
        //   }
        // };
        this.update = async (req, res, next) => {
            const { id } = req.params;
            try {
                const userUpdate = {
                    email: req.body.email,
                    role: req.body.role,
                };
                // TO DO eventueel berekeningen in backend doen
                const user = await mongoose_1.User.findOneAndUpdate({ _id: id }, userUpdate, {
                    new: true,
                }).exec();
                if (!user) {
                    throw new utilities_1.NotFoundError();
                }
                return res.status(200).json(user);
            }
            catch (err) {
                next(err);
            }
        };
        this.destroy = async (req, res, next) => {
            const { id } = req.params;
            try {
                let user = null;
                let { mode } = req.query;
                switch (mode) {
                    case 'delete':
                    default:
                        user = await mongoose_1.User.findOneAndRemove({ _id: id });
                        break;
                    case 'softdelete':
                        user = await mongoose_1.User.findByIdAndUpdate({ _id: id }, { _deletedAt: Date.now() });
                        break;
                    case 'softundelete':
                        user = await mongoose_1.User.findByIdAndUpdate({ _id: id }, { _deletedAt: null });
                        break;
                }
                if (!user) {
                    throw new utilities_1.NotFoundError();
                }
                else {
                    return res.status(200).json({
                        message: `Successful ${mode} the User with id: ${id}!`,
                        user,
                        mode,
                    });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.signupLocal = async (req, res, next) => {
            const { email, password } = req.body;
            let foundUser = await mongoose_1.User.findOne({ email: email });
            if (foundUser) {
                return res.status(403).json({ error: 'Email is already in use' });
            }
            const newUser = new mongoose_1.User({
                email: email,
                localProvider: {
                    password: password
                },
            });
            const user = await newUser.save();
            const token = this.authService.createToken(user);
            return res.status(200).json({
                email: user.email,
                id: user._id,
                role: user.role,
                token: `${token}`,
            });
        };
        this.signInLocal = async (req, res, next) => {
            this.authService.passport.authenticate('local', { session: this.config.auth.jwt.session }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(new utilities_1.NotFoundError());
                }
                const token = this.authService.createToken(user);
                return res.status(200).json({
                    email: user.email,
                    id: user._id,
                    token: `${token}`,
                    strategy: 'local',
                    role: user.role,
                    avatar: user.profile.avatar,
                });
            })(req, res, next);
        };
        this.config = config;
        this.authService = authService;
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map