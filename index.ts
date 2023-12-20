import app from "./app";

const PORT: number = 3000;
const hostname = "0.0.0.0";

app.listen(PORT, hostname, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
