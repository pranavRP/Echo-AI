import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import UserChats from "./models/userChats.js";
import Chat from "./models/chats.js";
import { requireAuth } from "@clerk/express";
import { clerkMiddleware } from "@clerk/express";

const port = process.env.PORT || 3000;
const app = express();

//const CLIENT_URL = "http://localhost:5173";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
console.log("✅ Allowed CORS Origin:", CLIENT_URL);

//✅ Apply CORS Middleware Correctly
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle Preflight CORS Requests
app.options("*", cors());

app.use(express.json());

app.use(clerkMiddleware());

// ✅ Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};

// ImageKit Configuration
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// Routes

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", async (req, res) => {
  //const userId = req.auth.userId;
  const userId = req.body.userId || "anonymous";
  const { text } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChats.findOne({ userId: userId });

    // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
    if (!userChats) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
      return res.status(201).send(savedChat._id);
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", async (req, res) => {
  const userId = req.query.userId || "anonymous";
  try {
    const userChats = await UserChats.findOne({ userId });
    // If there's no doc for this user, send back an empty array
    if (!userChats) {
      return res.status(200).json([]);
    }

    // Otherwise send back the 'chats' array
    return res.status(200).json(userChats.chats);
  } catch (err) {
    console.log("Error fetching userchats:", err);
    // Return a JSON with an error message
    return res.status(500).json({ message: "Error fetching userchats!" });
  }
});

app.get("/api/chats/:id", async (req, res) => {
  //const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id });

    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});

app.put("/api/chats/:id", async (req, res) => {
  const userId = req.auth.userId;

  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});
app.listen(port, () => {
  connect();
  console.log("Server running on 3000");
});

export default app;
connect(); // Ensures MongoDB connects
console.log("✅ Express Backend Ready for Serverless Deployment");
