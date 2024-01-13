import express from "express";
import cors from "cors";
import fetch from "cross-fetch";
import { FETCH_RESTAURANTS_URL, FETCH_MENU_URL } from "./constants.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// For Restaurants List API
app.get("/api/restaurants", async (req, res) => {
  await fetch(FETCH_RESTAURANTS_URL, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

// For Menu API
app.get("/api/menu", async (req, res) => {
  const { restaurantID } = req.query;
  console.log(req.query);

  await fetch(FETCH_MENU_URL + restaurantID, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.get("/", (req, res) => {
  res.json({ data: "Welcome to my server!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
