import express from "express";
import bodyParser from "body-parser";

import outputTranscript from "./src/summary/outputTranscript.mjs";
import videoInfo from "./src/info/videoInfo.mjs";

const port = 5000;

const app = express();

app.use(bodyParser.json());

app.get("/api/summary", async (req, res) => {
  const inputUrl = req.query.url;

  try {
    const summary = await outputTranscript(inputUrl);
    res.json({ result: summary });
    console.log("Summary generated successfully.");
  } catch (error) {
    console.error(error);
    // code 500 is internal server error
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/info", async (req, res) => {
  const inputUrl = req.query.url;

  try {
    const { id, title, thumbnails, channelTitle } = await videoInfo(
      inputUrl
    );
    res.json({
      videoInfo: {
        id: id,
        title: title,
        thumbnail: thumbnails,
        channel: channelTitle,
      },
    });
    console.log("Youtube info generated successfully.");
  } catch (error) {
    console.error(error);
    // code 500 is internal server error
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
