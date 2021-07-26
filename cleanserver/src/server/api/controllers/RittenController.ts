import { NextFunction, Request, Response } from 'express';
import { IRit, Rit } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class RittenController {

  
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const riders : Array<IRit> = await Rit.find().exec();
    return res.status(200).json(riders);
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const ritCreate = new Rit({
        author: req.body.author,
        authorMail : req.body.authorMail,
        info : { 
          name : req.body.data.info.name,
          distance : req.body.data.info.distance,
          region : req.body.data.info.region,
          firstedition : req.body.data.info.firstedition,
          type : req.body.data.info.type,
          description : req.body.data.info.description,
        },
        media : {
          bannerPicture : req.body.data.media.bannerPicture,
          firstPicture : req.body.data.media.firstPicture,
          secondPicture : req.body.data.media.secondPicture,
          thirdPicture : req.body.data.media.thirdPicture,
        },
        
        victories : { 
          one : { 
            victoryOneRider : req.body.data.victories.one.rider,
            victoryOneAmount : req.body.data.victories.one.amount,
            victoryOneTeam : req.body.data.victories.one.team,
          },
          two : {
            victoryTwoRider : req.body.data.victories.two.rider,
            victoryTwoAmount : req.body.data.victories.two.amount,
            victoryTwoTeam : req.body.data.victories.two.team,
    
          },
          three : { 
            victoryThreeRider : req.body.data.victories.three.rider,
            victoryThreeAmount : req.body.data.victories.three.amount,
            victoryThreeTeam : req.body.data.victories.three.team,
          },
          four : { 
            victoryFourRider : req.body.data.victories.four.rider,
            victoryFourAmount : req.body.data.victories.four.amount,
            victoryFourTeam : req.body.data.victories.four.team,
    
          },
          five : {
            victoryFiveRider : req.body.data.victories.five.rider,
            victoryFiveAmount : req.body.data.victories.five.amount,
            victoryFiveTeam : req.body.data.victories.five.team
          }
        },
      });
      const createdRide = await ritCreate.save();
      return res.status(201).json(createdRide);
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
        const periode : IRit = await Rit.findById(id)
        // .populate({
        //   path : 'values',
        //   populate : {
        //     path : 'shoe'
        //   }
        // })
        // .exec();
        return res.status(200).json(periode);
    };

    public showAll = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response<any>> => {
      const rit : Array<IRit> = await Rit.find().exec();
      // .populate({
      //   path : 'values',
      //   populate : {
      //     path : 'shoe'
      //   }
      // })
      // .exec();
      return res.status(200).json(rit);
  };


    
    // public showPortfolioFromUserID = async (
    //   req: Request,
    //   res: Response,
    //   next: NextFunction,
    // ) => {
    //   try {
    //     const { id } = req.params;
    //     const portfolio = await Portfolio.find( { "referredUser" : id } )
    //     .populate({
    //       path : 'values',
    //       populate : {
    //         path : 'shoe'
    //       }
    //     })
    //     .exec();
    //     return res.status(200).json(portfolio);
    //   } catch (err) {
    //     next(err);
    //   }
    // };

    
    public update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const portfolioUpdate = {
          totalWorth: req.body.totalWorth,
          totalItems: req.body.totalItems,
        };

        // TO DO eventueel berekeningen in backend doen
        const portfolio = await Portfolio.findOneAndUpdate({ _id: id }, portfolioUpdate, {
          new: true,
        }).exec();
  
        if (!portfolio) {
          throw new NotFoundError();
        }
        return res.status(200).json(portfolio);
      } catch (err) {
        next(err);
      }
    };

    

    store = async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      const { id } = req.params;
      try {
        const portfolioCreate = new Portfolio({
          referredUser: id
        });
        const portfolio = await portfolioCreate.save();
        return res.status(201).json(portfolio);
      } catch (err) {
        console.log(err);
        next(err);
      }
    };

    
    add = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const user = req.body.referredUser;
      const portfolio = await Portfolio.update( 
        { "referredUser" : user }, 
        {$push : {
          referredValues : id
        }} );
        return res.status(201).json(portfolio);
    };

    
    
    remove = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const user = req.body.referredUser;
      const portfolio = await Portfolio.update( 
        { "referredUser" : user }, 
        {$pull : {
          referredValues : id
        }} );
        return res.status(201).json(portfolio);
    };



}

export default RittenController;
