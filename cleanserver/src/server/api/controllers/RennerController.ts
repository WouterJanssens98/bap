import { NextFunction, Request, Response } from 'express';
import { IRider, Rider } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class RennerController {

  
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const periodes : Array<IRider> = await Rider.find().exec();
    return res.status(200).json(periodes);
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const rennerCreate = new Rider({
        author: req.body.author,
        authorMail : req.body.authorMail,
        info : { 
          name : req.body.data.info.name,
          nickname : req.body.data.info.nickname,
          placeofbirth : req.body.data.info.placeofbirth,
          youth : req.body.data.info.youth,
          career : req.body.data.info.career,
          aftercareer : req.body.data.info.aftercareer
        },
        media : {
          profilePicture : req.body.data.media.profilePicture,
          bannerPicture : req.body.data.media.bannerPicture,
          youthPicture : req.body.data.media.youthPicture,
          careerPicture : req.body.data.media.careerPicture,
          afterCareerPicture : req.body.data.media.afterCareerPicture
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
      console.log(rennerCreate);
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


    
    public showPortfolioFromUserID = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;
        const portfolio = await Portfolio.find( { "referredUser" : id } )
        .populate({
          path : 'values',
          populate : {
            path : 'shoe'
          }
        })
        .exec();
        return res.status(200).json(portfolio);
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

export default RennerController;
