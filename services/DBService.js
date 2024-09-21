const { default: mongoose } = require("mongoose");
const hey_jude = require("./hey_jude.json");
const veech_shelo = require("./veech_shelo.json");

const  dbConnect =async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect("mongodb+srv://benshuan:Ben8067783@chatapp.c8sq1fw.mongodb.net/?retryWrites=true&w=majority&appName=ChatApp", {
      dbName: "Jamoveo",
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected"));
  } catch (err) {
    console.log("err", err);
    mongoose.disconnect();
  }
};

const AllSongs = [
  {
    id: 1,
    name: "hey jude",
    artist: "The beatles",
    image:
      "https://lovethatsongpodcast.com/wp-content/uploads/2022/03/Beatles-HeyJude-768x768.jpg",
    lyrics: hey_jude,
  },
  {
    id: 2,
    name: "ואיך שלא",
    artist: "אריאל זילבר",
    image: "https://i.ytimg.com/vi/2GxJ_E4Alsw/maxresdefault.jpg",
    lyrics: veech_shelo,
  },
];

module.exports.AllSongs = AllSongs;
module.exports.dbConnect = dbConnect;
