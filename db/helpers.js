const mysql = require("mysql");
const dotenv = require("dotenv");
const moment = require("moment");
const fs = require("fs");

// initialize env variables
dotenv.config();

// connect to db
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "demozone_dev",
});

// store tokens in db
const storeTokens = (installation) => {
  let sql =
    "INSERT INTO demo_app_tokens VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?) ON DUPLICATE KEY UPDATE user_token= ?, bot_token = ?, installed_on = ?";
  const inserts = [
    "QUOTE-APPROVALS",
    installation.user.id,
    installation.team.id,
    installation.team.name,
    installation.enterprise.id,
    installation.enterprise.name,
    installation.user.token,
    installation.bot.token,
    moment().format("YYYY-MM-DD HH:mm:ss"),
    installation.user.token,
    installation.bot.token,
    moment().format("YYYY-MM-DD HH:mm:ss"),
  ];
  sql = mysql.format(sql, inserts);

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// store local installation record
const storeLocalInstallation = (installation) => {
  const { installations } = require("./installations");

  const index = installations.findIndex((existingInstallation) => {
    return existingInstallation.user.id === installation.user.id;
  });

  // strip out tokens
  installation.user.token = "";
  installation.bot.token = "";

  // update existing installation if exists
  if (~index) {
    installations[index] = installation;
  } else {
    installations.push(installation);
  }

  fs.writeFile(
    "./db/installations.json",
    JSON.stringify({ installations }, null, 2),
    (err) => {
      if (err) console.error(error);
    }
  );
};

// retrieve tokens from db
const retrieveTokens = (teamId) => {
  let sql =
    "SELECT user_token, bot_token FROM demo_app_tokens WHERE team_id = ? AND app_name = ?";
  const inserts = [teamId, "QUOTE-APPROVALS"];
  sql = mysql.format(sql, inserts);

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result[0]);
      }
    });
  });
};

// fetch installation from database
const fetchLocalInstallation = (tokens, teamId) => {
  const { installations } = require("./installations.json");
  const installation = installations.find((item) => {
    return item.team.id === teamId;
  });
  installation.bot.token = tokens.bot_token;
  installation.user.token = tokens.user_token;
  return installation;
};

module.exports = {
  storeTokens,
  storeLocalInstallation,
  retrieveTokens,
  fetchLocalInstallation,
};
