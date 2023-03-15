import {BSON} from 'realm';

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  summary!: string;
  owner_id!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Muhthar',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      summary: 'string',
      owner_id: 'string',
    },
  };
}
