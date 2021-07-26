import { default as mongoose, Document, Schema } from 'mongoose';
import { IUser} from './user.model';


interface IInfo {
  name: string;
  distance : number;
  region : string;
  firstedition : number;
  type : string;
  description : string;
}
interface IMedia {
  bannerPicture : string;
  firstPicture : string;
  secondPicture : string;
  thirdPicture : string;
}
interface IVictories {
  victoryOneRider : string,
  victoryOneAmount : number,
  victoryOneTeam : string,

  victoryTwoRider : string,
  victoryTwoAmount : number,
  victoryTwoTeam : string,

  victoryThreeRider : string,
  victoryThreeAmount : number,
  victoryThreeTeam : string,

  victoryFourRider : string,
  victoryFourAmount : number,
  victoryFourTeam : string,

  victoryFiveRider : string,
  victoryFiveAmount : number,
  victoryFiveTeam : string,
  
}


interface IRit extends Document {
  
  info  : IInfo,
  media : IMedia,
  victories : IVictories,
  author : IUser['_id'];
  authorMail : string,
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const ritSchema: Schema = new Schema(
  {
    info : {
      name: { type: String, required: true, unique: true, max: 128 },
      distance : { type : Number, required : true, unique : false , max :750},
      region : { type : String , required : true, unique: false, max : 128},
      firstedition : { type : Number, required : true, unique : false, max : 2020},
      type : { type : String, required : true, unique : false, max : 1000},
      description : { type : String, required : true, unique : true, max : 1000},
    },
    media : {
      bannerPicture :  { type: String, required: true, unique: true, max: 128 },
      firstPicture :  { type: String, required: true, unique: true, max: 128 },
      secondPicture :  { type: String, required: true, unique: true, max: 128 },
      thirdPicture :  { type: String, required: true, unique: true, max: 128 },
    },
    victories : {
      one : {
        victoryOneRider : {type : String, required : true, unique : false, max : 128},
        victoryOneAmount : {type : Number, required : true, unique : false, max : 128},
        victoryOneTeam : {type : String, required : true, unique : false, max : 128},
      },
      two : {
        victoryTwoRider : {type : String, required : true, unique : false, max : 128},
        victoryTwoAmount : {type : Number, required : true, unique : false, max : 128},
        victoryTwoTeam : {type : String, required : true, unique : false, max : 128},
      },
      three : {
        victoryThreeRider : {type : String, required : true, unique : false, max : 128},
        victoryThreeAmount : {type : Number, required : true, unique : false, max : 128},
        victoryThreeTeam : {type : String, required : true, unique : false, max : 128},
      },
      four : {
        victoryFourRider : {type : String, required : true, unique : false, max : 128},
        victoryFourAmount : {type : Number, required : true, unique : false, max : 128},
        victoryFourTeam : {type : String, required : true, unique : false, max : 128},
      },
      five : {
        victoryFiveRider : {type : String, required : true, unique : false, max : 128},
        victoryFiveAmount : {type : Number, required : true, unique : false, max : 128},
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

const Rit = mongoose.model<IRit>('Rit', ritSchema);

export { IRit, Rit, ritSchema };
