import mongoose from 'mongoose';
import app from './app.js';

const port = 3000;

const dbString = 'mongodb+srv://legend:yadav152530@mongo-practice-js.cfemuts.mongodb.net/';


(async () => {
  try {
    await mongoose.connect(dbString);
    console.log("Connected to database");

    app.on("error", (error) => {
      console.log("ERROR:", error);
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("ERROR:", error);
    throw error;
  }
})();
