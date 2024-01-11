const { default: mongoose } = require("mongoose");
const app = require("./server");
const config = require("./utils/config");

console.log("connecting to DB");

mongoose
  .connect(`${config.MONGODB_URI}${config.DB_NAME}`)
  .then(() => {
    console.log("Succesfully connected to the MongoDB");

    app.listen(config.PORT, () => {
      console.log(`Server running on ${config.HOSTNAME}:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connection to the MongoDB`, error);
  });
