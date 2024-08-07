import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect(config.mongourl as string);

  app.listen(config.port, () => {
    console.log("listening on port", config.port);
  });
}

main()
  .then(() => {
    console.log("mongodb connection established");
  })
  .catch((error) => {
    console.log(error);
  });
