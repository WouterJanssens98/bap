import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import { IConfig, AuthService, Role } from '../../services';
import {
  UserController,
  PeriodeController
} from '../controllers';

class ApiRouter {
  public router: Router;
  private periodeController: PeriodeController;
  private userController: UserController;
  private config: IConfig;
  private authService: AuthService;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;

    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private  registerControllers(): void {
    this.userController = new UserController(this.config, this.authService);
    this.periodeController = new PeriodeController();
   
  }

  private registerRoutes(): void {
  

    /*
     * Users routes
     */
    this.router.get('/users', this.userController.index);
    this.router.put('/users/:id', this.userController.update);
    this.router.get('/users/:id', this.userController.show);
    this.router.delete('/users/:id', this.userController.destroy);
    this.router.post('/auth/signin/', this.userController.signInLocal);
    this.router.post('/auth/signup/', this.userController.signupLocal);
    this.router.post('/uploadfile', this.userController.upload);


    /// PROJECT ROUTES ///




    /*
     * Periode routes
     */

    this.router.get('/periode', this.periodeController.index)
    this.router.post('/periode/add', this.periodeController.create)
    this.router.get('/periode/:id', this.periodeController.show)

    

  }
}

export default ApiRouter;
