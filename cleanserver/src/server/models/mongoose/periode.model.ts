import { default as mongoose, Document, Schema } from 'mongoose';
import { IUser} from './user.model';
interface IPeriode extends Document {
  start : number;
  end : number;
  bannerImage : string;
  author : IUser['_id'];
  authorMail : string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const periodeSchema: Schema = new Schema(
  {
    start: { type: Number, required: true, unique: false, max: 2030 },
    end : { type : Number, required : true, unique : false , max :2030},
    bannerImage : { type : String, required : false, unique : false, max : 128},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


const Periode = mongoose.model<IPeriode>('Periode', periodeSchema);

export { IPeriode, Periode, periodeSchema };
