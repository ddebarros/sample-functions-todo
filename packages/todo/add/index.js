const connect = require('./mongodb-client');

exports.main = async function main(args) {
  const userId = args.__ow_headers['x-user-id'];
  if (!userId) {
    throw new Error('user id is required')
  }

  if (!args.content) {
    throw new Error ('content is missing')
  }

  const client = await connect();
  const db = await client.db(process.env.DB_DATABASE);
  const tasksCollection = await db.collection('todotasks');
  const res = await tasksCollection.insertOne({
    user_id: userId,
    content: args.content,
    done: false,
  });
  
  const insertedItem = res.ops[0];

  return {
    body: {
      task: insertedItem
    }
  }
}
