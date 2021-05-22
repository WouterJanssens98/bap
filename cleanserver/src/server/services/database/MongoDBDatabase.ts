import { default as mongoose, Connection, Schema } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
 
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  // private shoes: Array<IShoe>;
  // private members: Array<IMember>;

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    // this.shoes = [];
    // this.members = [];
  }

  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose
        .connect(this.config.mongoDBConnection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(data => {
          this.db = mongoose.connection;

          this.logger.info('Connected to the mongodb database', {});

          resolve(true);
        })
        .catch(error => {
          this.logger.error("Can't connect to the database", error);

          reject(error);
        });
    });
  }

  public disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .close(true)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          this.logger.error("Can't disconnect the database", error);

          reject(error);
        });
    });
  }


  // private getRandomPostsAsArrayOfIds(nPosts: number) {
  //   const tempPosts = JSON.parse(JSON.stringify(this.posts)) as Array<IPost>;
  //   const arrayOfIds = [];
  //   while (arrayOfIds.length < nPosts) {
  //     const removedPost = tempPosts.splice(
  //       Math.floor(Math.random() * nPosts),
  //       1,
  //     )[0];
  //     arrayOfIds.push(removedPost._id);
  //   }
  //   return arrayOfIds;
  // }
}

export default MongoDBDatabase;