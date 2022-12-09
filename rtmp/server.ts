import NodeMediaServer from "node-media-server";
import axios from "axios";
const pathToFfmpeg: string = require("ffmpeg-static");

const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: false,
    ping: 60,
    ping_timeout: 30,
  },

  http: {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./public",
  },
  trans: {
    ffmpeg: pathToFfmpeg,
    tasks: [
      {
        // stream the video to the browser in HLS format
        app: "live",
        vc: "copy",
        ac: "aac",
        acParam: ["-b:a", "192k", "-ar", "48000"],
        hls: true,
        hlsFlags: "[hls_time=3:hls_list_size=3:hls_flags=delete_segments]",
        mp4: true,
        mp4Flags: "[movflags=frag_keyframe+empty_moov]",
      },
    ],
  },
  logType: 0,
});

nms.run(); // Start the RTMP server

nms.on("prePublish", async (id, StreamPath, args: any) => {
  let session = nms.getSession(id) as any;
  try {
    const response = await axios.post<boolean>(
      "http://server_auth:8000/verifyAuthToken",
      args
    );
    const auth = await response.data;
    if (auth == false) {
      session.reject("Auth failed");
      return false;
    }
    console.log("Auth success");
  } catch (e) {
    console.log(e);
    session.reject("Auth failed");
    return false;
  }
});
