import { NextFunction, Request, Response } from 'express';
import { IRider, Rider } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class RennerController {

  
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const riders : Array<IRider> = await Rider.find().exec();
    return res.status(200).json(riders);
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const rennerCreate = new Rider({
        author: req.body.author,
        authorMail : req.body.authorMail,
        info : { 
          name : req.body.data.info.name,
          nickname : req.body.data.info.nickname,
          dateofbirth : req.body.data.info.dateofbirth,
          placeofbirth : req.body.data.info.placeofbirth,
          startCareer : req.body.data.info.startCareer,
          endCareer : req.body.data.info.endCareer,
          periode : req.body.data.info.periode,
          youth : req.body.data.info.youth,
          career : req.body.data.info.career,
          aftercareer : req.body.data.info.aftercareer
        },
        media : {
          profilePicture : req.body.data.media.profilePicture,
          bannerPicture : req.body.data.media.bannerPicture,
          youthPicture : req.body.data.media.youthPicture,
          careerPicture : req.body.data.media.careerPicture,
          afterCareerPicture : req.body.data.media.afterCareerPicture,
          audioURLYouth : req.body.data.media.audioURLYouth,
          audioURLCareer : req.body.data.media.audioURLCareer,
          audioURLAfterCareer : req.body.data.media.audioURLAfterCareer,
        },
        
        victories : { 
          one : { 
            victoryOneYear : req.body.data.victories.one.year,
            victoryOneRide : req.body.data.victories.one.ride,
            victoryOneTeam : req.body.data.victories.one.team,
          },
          two : {
            victoryTwoYear : req.body.data.victories.two.year,
            victoryTwoRide : req.body.data.victories.two.ride,
            victoryTwoTeam : req.body.data.victories.two.team,
    
          },
          three : { 
            victoryThreeYear : req.body.data.victories.three.year,
            victoryThreeRide : req.body.data.victories.three.ride,
            victoryThreeTeam : req.body.data.victories.three.team,
          },
          four : { 
            victoryFourYear : req.body.data.victories.four.year,
            victoryFourRide : req.body.data.victories.four.ride,
            victoryFourTeam : req.body.data.victories.four.team,
    
          },
          five : {
            victoryFiveYear : req.body.data.victories.five.year,
            victoryFiveRide : req.body.data.victories.five.ride,
            victoryFiveTeam : req.body.data.victories.five.team
          }
        },
      });
      const createdRenner = await rennerCreate.save();
      return res.status(201).json(createdRenner);
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
        const periode : IRider = await Rider.findById(id)
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
      const periode : Array<IRider> = await Rider.find().exec();
      // .populate({
      //   path : 'values',
      //   populate : {
      //     path : 'shoe'
      //   }
      // })
      // .exec();
      return res.status(200).json(periode);
  };


    
    public showRidersFromPeriod = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;
        const riders = await Rider.find( { 'info.periode' : id } ).exec();
        return res.status(200).json(riders);
      } catch (err) {
        next(err);
      }
    };

    
    public update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const portfolioUpdate = {
          totalWorth: req.body.totalWorth,
          totalItems: req.body.totalItems,
        };

        // TO DO eventueel berekeningen in backend doen
        const portfolio = await Rider.findOneAndUpdate({ _id: id }, portfolioUpdate, {
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

    

    



}

export default RennerController;
