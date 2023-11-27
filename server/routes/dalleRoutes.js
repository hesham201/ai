import express from "express";
import * as dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import { Configuration, OpenAIApi } from "openAI";
import OpenAI from "openai";
// import Post from "../mongodb/models/post.js";
dotenv.config();
const router = express.Router();
const configuration = {
  apiKey: process.env.OPEN_AI_KEY,
};
const openai = new OpenAI(configuration);
router.get("/", (req, res) => {
  res.send("hello from dalle");
});
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
  }
});
export default router;
