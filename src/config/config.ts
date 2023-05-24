import { config } from "dotenv";
import { truncate } from "fs";
import path from "path"

config({
  path: path.join(path.dirname(__dirname), "..", ".env")
})

const conf = {
  port: parseInt(process.env.PORT!),

  mediaPath: path.join(path.dirname(__dirname), "..", "public", "media"),

  db: {
    url: process.env.MONGODB_URL,
  },

  jwt: {
    secret: process.env.TOKEN_SECRET,
    accessTokenExpire: process.env.Access_Token_Expire,
  },
};

Object.freeze(conf);

export default conf;