const ObjectId = require('mongodb').ObjectID;
const connect = require('./mongodb-client');

exports.main = async function main(args) {
  const userId = args.__ow_headers['x-user-id'];
  if (!userId) {
    throw new Error('user id is required')
  }

  if (!args.id) {
    throw new Error ('id is missing')
  }

  if (!args.content) {
    throw new Error('content is missing')
  } 

  const client = await connect();
  const db = await client.db(process.env.DB_DATABASE);
  const tasksCollection = await db.collection('todotasks');

  const res = await tasksCollection.findOneAndUpdate(
    {
      '_id': ObjectId(args.id),
      'user_id': userId,
    },
    {
      $set: {
        content: args.content ?? '',
        done: args.done,
      }
    },
    { 
      returnNewDocument: true
    }
  );
  
  const updateItem = res.value;

  return {
    body: {
      task: updateItem
    }
  }
}
