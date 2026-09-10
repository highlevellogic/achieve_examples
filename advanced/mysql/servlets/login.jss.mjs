// mysql/servlets/login.jss.mjs

import mysql from "mysql2";

const sql = "SELECT pword FROM users WHERE uname = ? LIMIT 1";

/*
  Database credentials - dbcreds
  The host and database below match the setup in setup.sql.
  Provide your own username and password.
*/

const dbcreds = {
  host:"localhost",
  user:"your_username",
  password:"your_password",
  database:"achieve_demo"
};

export function servlet(session) {
  session.allowAsync = true;

  const con = mysql.createConnection(dbcreds);
  const p = session.parms;

  con.connect(function (err) {
    if (err) {
      console.log("connection error: " + err.message);
      session.response.end("login failed: " + err.message);
      con.end();
      return;
    }

    con.execute(sql,[p.uname],function (err,rows) {
      try {
        if (err) {
          console.log("login error: " + err.message);
          session.response.end("login failed: " + err.message);
        } else if (rows.length === 0 || rows[0].pword !== p.password) {
          console.log("unsuccessful login: " + p.uname);
          session.response.end("unsuccessful login: " + p.uname);
        } else {
          console.log("successful login: " + p.uname);
          session.response.end("successful login: " + p.uname);
        }
      } finally {
        con.end();
      }
    });
  });
}