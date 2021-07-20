import { default as mongoose, Document, Schema } from 'mongoose';
import { IUser} from './user.model';


interface IInfo {
  name: string;
  nickname : string;
  placeofbirth : string;
  dateofbirth : string;
  youth : string;
  career : string;
  aftercareer : string;
  
}
interface IMedia {
  profilePicture : string;
  bannerPicture : string;
  youthPicture : string;
  careerPicture : string;
  afterCareerPicture : string;
}
interface IVictories {
  victoryOneYear : number,
  victoryOneRide : string,
  victoryOneTeam : string,
  victoryTwoYear : number,
  victoryTwoRide : string,
  victoryTwoTeam : string,
  victoryThreeYear : number,
  victoryThreeRide : string,
  victoryThreeTeam : string,
  victoryFourYear : number,
  victoryFourRide : string,
  victoryFourTeam : string,
  victoryFiveYear : number,
  victoryFiveRide : string,
  victoryFiveTeam : string,
}


interface IRider extends Document {
  
  info  : IInfo,
  media : IMedia,
  victories : IVictories,
  author : IUser['_id'];
  authorMail : string,
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const riderSchema: Schema = new Schema(
  {
    info : {
      name: { type: String, required: true, unique: true, max: 128 },
      nickname : { type : String, required : true, unique : true , max :128},
      placeofbirth : { type : String , required : true, unique: false, max : 128},
      dateofbirth : { type : String, required : true, unique : false, max : 128},
      youth : { type : String, required : true, unique : true, max : 1000},
      career : { type : String, required : true, unique : true, max : 1000},
      aftercareer : { type : String, required : true, unique : true, max : 1000},
    },
    media : {
      profilePicture :  { type: String, required: true, unique: true, max: 128 },
      bannerPicture :  { type: String, required: true, unique: true, max: 128 },
      youthPicture :  { type: String, required: true, unique: true, max: 128 },
      careerPicture :  { type: String, required: true, unique: true, max: 128 },
      afterCareerPicture :  { type: String, required: true, unique: true, max: 128 },
    },
    victories : {
      one : {
        victoryOneYear : {type : Number, required : true, unique : false, max : 2020},
        victoryOneRide : {type : String, required : true, unique : false, max : 128},
        victoryOneTeam : {type : String, required : true, unique : false, max : 128},
      },
      two : {
        victoryTwoYear : {type : Number, required : true, unique : false, max : 2020},
        victoryTwoRide : {type : String, required : true, unique : false, max : 128},
        victoryTwoTeam : {type : String, required : true, unique : false, max : 128},
      },
      three : {
        victoryThreeYear : {type : Number, required : true, unique : false, max : 2020},
        victoryThreeRide : {type : String, required : true, unique : false, max : 128},
        victoryThreeTeam : {type : String, required : true, unique : false, max : 128},
      },
      four : {
        victoryFourYear : {type : Number, required : true, unique : false, max : 2020},
        victoryFourRide : {type : String, required : true, unique : false, max : 128},
        victoryFourTeam : {type : String, required : true, unique : false, max : 128},
      },
      five : {
        victoryFiveYear : {type : Number, required : true, unique : false, max : 2020},
        victoryFiveRide : {type : String, required : true, unique : false, max : 128},
        victoryFiveTeam : {type : String, required : true, unique : false, max : 128},
      }
    },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Rider = mongoose.model<IRider>('Rider', riderSchema);

export { IRider, Rider, riderSchema };
