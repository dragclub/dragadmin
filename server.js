import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get the current directory name (__dirname equivalent in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the React app's build directory
app.use("/", express.static(path.join(__dirname, "dist")));

// Send index.html for any request that doesn't match static files
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Define the port
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
