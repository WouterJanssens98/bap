import { default as mongoose, Schema, Document } from 'mongoose';
import { default as bcrypt } from 'bcrypt';



interface IScore extends Document {
  score: number;
  name: string;
  age : number ;
  location: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;


}

const scoreSchema: Schema = new Schema(
  {
    score: { type: Number, required: true, unique: false, max: 20 },
    name: { type: String, required: true, unique: false, max: 256 },
    age: { type: Number, required: true, unique: false, max: 99 },
    location: { type: String, required: true, unique: false, max: 256 },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);



const Score = mongoose.model<IScore>('Score', scoreSchema);

export { IScore, Score, scoreSchema };
