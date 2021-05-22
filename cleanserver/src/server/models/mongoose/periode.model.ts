import { default as mongoose, Document, Schema } from 'mongoose';
import { IRider} from './rider.model';
import { IUser} from './user.model';
interface IPeriode extends Document {
  referredRiders: Array<IRider['_id']>;
  fromYear : number;
  toYear : number;
  imageUrl : string;
  author : IUser['_id'];
  authorMail : string,
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const periodeSchema: Schema = new Schema(
  {

    referredRiders: [{
      type: Schema.Types.ObjectId,
      ref: 'Rider',
      required: false,
    }],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fromYear: { type: Number, required: true, unique: false, max: 2030 },
    toYear : { type : Number, required : true, unique : false , max :2030},
    imageUrl : { type : String, required : false, unique : false, max : 128},
    authorMail : { type : String, required : true, unique : false, max : 128},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


periodeSchema.virtual('id').get(function(this: IPeriode) {
  return this._id;
});
periodeSchema.virtual('riders', {
  ref: 'Rider',
  localField: 'referredRiders',
  foreignField: '_id',
  justOne: false,
});

const Periode = mongoose.model<IPeriode>('Periode', periodeSchema);

export { IPeriode, Periode, periodeSchema };
