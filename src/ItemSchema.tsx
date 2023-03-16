
import {Realm} from '@realm/react';

export class Item1 extends Realm.Object{
    _id!: Realm.BSON.ObjectId;
    summary!: string;
    isComplete!: boolean;
    owner_id!: string;

  static schema = {
    name: 'Item1',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      summary: 'string',
      isComplete: {type: 'bool', default: false},
      owner_id: 'string',
    },
  };
}
