const { connect } = require('./lib/mongodb-client');

exports.main = async function main(args) {
  const userId = args.__ow_headers['x-user-id'];
  if (!userId) {
    throw new Error('user id is required')
  }

  const client = await connect();
  const db = await client.db(process.env.DB_DATABASE);
  const tasksCollection = await db.collection('todotasks');
  const tasks = await tasksCollection.find({ user_id: userId }).toArray();

  return {
    body: {
      tasks
    }
  }
}
