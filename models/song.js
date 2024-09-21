const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const {AllSongs} = require("../services/DBService");

const songScheme = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  lyrics: {
    type: Array,
  },
});


class Song {
  //create a constractor for user class an implement the mongoose model function for every user make it easy to save in database
  constructor(song) {
    this.name = song.name;
    this.id = song.id;
    this.artist = song.artist;
    this.image = song.image;
    this.lyrics = song.lyrics;

  }

  static GetSongsByQuery = async (query) => {
    const songs =AllSongs.filter(song => song.name.includes(query))

    if (songs.length===0) {
      return {
        code: 404,
        ok: false,
        data:[] ,
        message: "We could not find the song",
      };
    }
    return {
      code: 200,
      ok: true,
      data: songs,
      message: "Those are the songs we found for you",
    };
    
  };  
  
  static GetSongById = async (id) => {
    const song = AllSongs.find(song => song.id==id)

  if (!song) {
    return {
      code: 404,
      ok: false,
      data:[] ,
      message: "We could not find the song",
    };
  }

    return {
      code: 200,
      ok: true,
      data: [song],
      message: "Those are the songs we found for you",
    };
    
  };


}

module.exports = Song;
