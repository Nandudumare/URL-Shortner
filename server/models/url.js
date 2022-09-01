const { Schema, model } = require("mongoose");

const urlSchema = new Schema(
  {
    originalUrl: { type: String },
    shortUrl: { type: String, unique: true },
    expireAt: { type: Date, default: Date.now(), expires: 600 }, //expires in 10min
  },
  {
    timestamps: true,
  }
);

const urlModel = model("url", urlSchema);

module.exports = urlModel;
