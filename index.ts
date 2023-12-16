import { v2 as cloudinary } from "cloudinary";
import app from "./app";
cloudinary.config({
  cloud_name: "dwy823csd",
  api_key: "997985659283223",
  api_secret: "rEUA993WB94SDSZhKKG6jurbJqo",
});
const PORT: number = 3000;
const hostname = "0.0.0.0";

app.listen(PORT, hostname, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
