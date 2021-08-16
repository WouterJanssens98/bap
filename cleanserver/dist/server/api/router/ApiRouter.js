"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
class ApiRouter {
    constructor(config, authService) {
        this.config = config;
        this.authService = authService;
        this.router = express_1.default.Router();
        this.registerControllers();
        this.registerRoutes();
    }
    registerControllers() {
        this.userController = new controllers_1.UserController(this.config, this.authService);
        this.periodeController = new controllers_1.PeriodeController();
        this.rennerController = new controllers_1.RennerController();
        this.rittenController = new controllers_1.RittenController();
        this.scoreController = new controllers_1.ScoreController();
    }
    registerRoutes() {
        /*
         * Users routes
         */
        // this.router.get('/users', this.userController.index);
        this.router.put('/users/:id', this.userController.update);
        this.router.get('/users/:id', this.userController.show);
        this.router.delete('/users/:id', this.userController.destroy);
        this.router.post('/auth/signin/', this.userController.signInLocal);
        this.router.post('/auth/signup/', this.userController.signupLocal);
        // this.router.post('/uploadfile', this.userController.upload);
        /// PROJECT ROUTES ///
        /*
         * Periode routes
         */
        this.router.get('/periode', this.periodeController.index);
        this.router.post('/periode/add', this.periodeController.create);
        this.router.get('/periode/:id', this.periodeController.show);
        /*
         * Renner routes
         */
        this.router.get('/renner', this.rennerController.index);
        this.router.post('/renner/add', this.rennerController.create);
        this.router.get('/renner/:id', this.rennerController.show);
        this.router.get('/renner-periode/:id', this.rennerController.showRidersFromPeriod);
        /*
        * Ritten routes
        */
        this.router.get('/ritten', this.rittenController.index);
        this.router.post('/ritten/add', this.rittenController.create);
        this.router.get('/ritten/:id', this.rittenController.show);
        /*
      * Score routes
      */
        this.router.get('/score/', this.scoreController.index);
        this.router.post('/score/add', this.scoreController.create);
    }
}
exports.default = ApiRouter;
//# sourceMappingURL=ApiRouter.js.map