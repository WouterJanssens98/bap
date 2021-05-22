import { default as mongoose, Document, Schema } from 'mongoose';
interface IRider extends Document {
  name: string;
  bijnaam : string;
  geboortePlaats : string;
  geboorteDatum : string,
  jeugd : string,
  verloop : string,
  victoryOneYear : number,
  victoryOneRit : string,
  victoryOneTeam : string,
  profilePicture : string,
  bannerPicture : string,
  jeugdPicture : string,
  verloopPicture : string,
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const riderSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, max: 128 },
    bijnaam : { type : String, required : true, unique : false , max :128},
    geboortePlaats : { type : String , required : true, unique: false, max : 128},
    geboorteDatum : { type : String, required : false, unique : false, max : 128},
    jeugd : { type : String, required : false, unique : false, max : 128},
    verloop : { type : String, required : false, unique : false, max : 128},
    victoryOneYear : { type : Number, required : false, unique : false, max : 2030},
    victoryOneRit : { type : String, required : false, unique : false, max : 128},
    victoryOneTeam : { type : String, required : false, unique : false, max : 128},
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
