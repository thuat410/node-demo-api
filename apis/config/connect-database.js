const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || "demo_db";
import mongoose from "mongoose";

const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const connectWithRetry = () => {
  return mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true, useFindAndModify: false },
    (err) => {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 5 sec",
          err,
        );
        setTimeout(connectWithRetry, 5000);
      }
    },
  );
};

module.exports = connectWithRetry;
