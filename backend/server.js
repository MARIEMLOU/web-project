// server.js

const app = require("./app");
const http = require("http");

require("dotenv").config(); // Load environment variables

const PORT = process.env.PORT || 5000; // Change to a different port, e.g., 5000

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
