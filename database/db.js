const connection = require("./conn");
const util = require("util");

const query = util.promisify(connection.query).bind(connection);

const listall = async (tablename) => {
  let sql = `SELECT * from ${tablename}`;
  const querydata = await query(sql);
  return querydata;
};

const add = (tablename, data) => {
  let sql = `INSERT into  ${tablename} set ? `;
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    return result;
  });
};

const lastinsertrecord = async (field, tablename) => {
  const sql = `SELECT MAX(${field}) AS id  FROM ${tablename}`;
  const querydata = await query(sql);
  return querydata[0].id;
};

const singlerecord = async (tablename, field, value) => {
  let querydata = await query(
    `SELECT * from  ${tablename} where ${field} = ?`,
    [value]
  );
  return querydata[0];
};

const recordcount = async (tablename, field, value) => {
  let tablecount = await query(
    `SELECT count(*)  as count  from  ${tablename} where ${field} = ?`,
    [value]
  );
  return tablecount[0].count;
};

const getRecordByParams = async (tablename, field, value, order = "") => {
  const querydata = await query(
    `SELECT  * from  ${tablename} where ${field} = ?  ${order} `,
    [value]
  );
  return querydata;
};

const deleterecord = (tablename, field, id) => {
  let sql = `DELETE  from  ${tablename}  where ${field} = ${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    return results;
  });
};
const update = (tablename, field, id, data) => {
  let sql = `UPDATE  ${tablename}  set ?  where ${field} = '${id}'`;
  connection.query(sql, data, (err, results) => {
    if (err) throw err;
    return results;
  });
};
module.exports = {
  listall,
  add,
  lastinsertrecord,
  singlerecord,
  deleterecord,
  recordcount,
  getRecordByParams,
  update,
  query,
};
