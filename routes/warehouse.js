const fs = require("fs");
const router = require("express").Router();
const uuidv4 = require("uuid");

function readBasicVideosList() {
  const basicVideosFile = fs.readFileSync("./data/videos.json");
  const basicVideosData = JSON.parse(basicVideosFile);
  return basicVideosData;
}

function filterDetailedVideosList(videoId) {
  const detailedVideosFile = fs.readFileSync("./data/video-details.json");
  const detailedVideosData = JSON.parse(detailedVideosFile);
  const filteredList = detailedVideosData.filter((video) => {
    return video.id == videoId;
  });
  return JSON.stringify(filteredList);
}

function writeVideos(data) {
  const basicDetails = (({ id, channel, title, image }) => ({
    id,
    channel,
    title,
    image,
  }))(data);

  const basicVideosFile = fs.readFileSync("./data/videos.json");
  const basicVideosData = JSON.parse(basicVideosFile);
  const newBasic = [...basicVideosData, basicDetails];
  const stringifiedBasic = JSON.stringify(newBasic);
    fs.writeFileSync("./data/videos.json", stringifiedBasic);

  const fullDetails = data;

  const detailedVideosFile = fs.readFileSync("./data/video-details.json");
  const detailedVideosData = JSON.parse(detailedVideosFile);
  console.log("detailedVideos: ", detailedVideosData);
  const newDetailed = [...detailedVideosData, fullDetails];
  const stringifiedFull = JSON.stringify(newDetailed);
  fs.writeFileSync("./data/video-details.json", stringifiedFull);
}

//routes

router.get("/", (req, res) => {
  res.json(readBasicVideosList());
});

router.get("/video/image", (req, res) => {
    res.json(readBasicVideosList());
  });
  

router.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  let selectedVideo = filterDetailedVideosList(videoId);
  res.send(selectedVideo);
});

router.post("/", (req, res) => {
  const newVideo = {
    id: uuidv4.v4(),
    title: req.body.title,
    channel: "Placeholder-Channel-Name",
    image: "//localhost:8080/images/bike.jpg",
    description: req.body.desc,
    views: "9,999",
    likes: "1,111",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date().getTime(),
    comments: [
      {
        id: uuidv4.v4(),
        name: "Name-firstComment",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, nisi illo voluptatem nobis rerum quibusdam!",
        likes: 0,
        timestamp: 1632227521000,
      },
      {
        id: uuidv4.v4(),
        name: "Name-secondComment",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatem deleniti blanditiis fuga.",
        likes: 10,
        timestamp: new Date().getTime(),
      },
    ],
  };

  writeVideos(newVideo);
});

module.exports = router;