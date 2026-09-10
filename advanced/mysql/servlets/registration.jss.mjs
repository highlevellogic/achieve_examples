
// mysql/servlets/registration.jss.mjs

import mysql from "mysql2";

const sql = "INSERT INTO users (full_name, uname, email, pword) VALUES (?, ?, ?, ?)";

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
  const values = [p.name, p.uname, p.email, p.password];

  con.connect(function (err) {
    if (err) {
      console.log("connection error: " + err.message);
      session.response.end("registration failed: " + err.message);
      con.end();
      return;
    }

    con.query(sql,values,function (err) {
      try {
        if (err) {
          console.log("registration error: " + err.message);
          session.response.end("registration failed: " + err.message);
          return;
        }

        console.log("registration complete: " + p.uname);
        session.response.end("registration complete");
      } finally {
        con.end();
      }
    });
  });
}