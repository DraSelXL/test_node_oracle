const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const oracledb = require('oracledb');
oracledb.initOracleClient({
  libDir: process.env['CLIENT_PATH']
});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function run() {
  const connection = await oracledb.getConnection({
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    connectionString: `localhost/${process.env['DB_NAME']}`
  });

  const result = await connection.execute(`SELECT * FROM test`);

  console.log(result.rows);
  connection.close();
}

run();