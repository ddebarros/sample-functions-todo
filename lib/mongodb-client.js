const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

const DB_CERT = process.env['CA_CERT'].replace(/\\n/g, '\n');
const DATABASE_URL = process.env['DATABASE_URL'];
const uri = DATABASE_URL

const tlsCAFilePath = path.resolve(__dirname, 'certificate.pem');
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