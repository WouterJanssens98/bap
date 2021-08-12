import { NextFunction, Request, Response } from 'express';
import { IScore, Score } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class ScoreController {

  
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const riders : Array<IScore> = await Score.find().exec();
    return res.status(200).json(riders);
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const scoreCreate = new Score({
        score: req.body.score,
        name: req.body.name,
        location: req.body.location,
        age: req.body.age,
      });
      const createdScore = await scoreCreate.save();
      return res.status(201).json(createdScore);
    } catch (err) {
      next(err);
    }
  };

    
    public show = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const { id } = req.params;
        const periode : IScore = await Score.findById(id)
        return res.status(200).json(periode);
    };

   

}

export default ScoreController;
