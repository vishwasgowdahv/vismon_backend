import mongoose from "mongoose";
const URI =
  "mongodb+srv://vishwasgowda722:Vish%40Tech789@projects.cxzlehz.mongodb.net/";
const connectToDb = async() => {
  await mongoose.connect(URI);
};

export default connectToDb
