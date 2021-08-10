import { NextFunction, Request, Response } from 'express';
import { IPeriode, Periode } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class PeriodeController {

  
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const periodes : Array<IPeriode> = await Periode.find().exec();
    return res.status(200).json(periodes);
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const periodeCreate = new Periode({
        start: req.body.data.info.start,
        end : req.body.data.info.end,
        description : req.body.data.info.description,
        bannerImage : req.body.data.info.bannerImage,
        audioURL : req.body.data.info.audioURL,
        author: req.body.author,
        authorMail : req.body.authorMail,
      });
      const periode = await periodeCreate.save();
      return res.status(201).json(periode);
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
        const periode : IPeriode = await Periode.findById(id)
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

export default PeriodeController;
