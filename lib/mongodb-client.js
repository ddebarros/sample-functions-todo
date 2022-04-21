const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const DB_HOSTNAME = process.env['DB_HOSTNAME'];
const DB_USERNAME = process.env['USERNAME'];
const DB_PASSWORD = process.env['PASSWORD'];
const DB_DATABASE = process.env['DATABASE'];
const DB_CERT = process.env['CA_CERT'].replace(/\\n/g, '\n');
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_DATABASE}?authSource=admin`;

const tlsCAFilePath = path.resolve('certificate.pem');
fs.writeFileSync(tlsCAFilePath, DB_CERT, { encoding: 'utf8' });

module.exports = async function connect() {
  let client = new MongoClient(uri, {
    tls: true,
    tlsCAFile: tlsCAFilePath, 
    tlsInsecure: true
  });
  
  await client.connect();
  return client;
};