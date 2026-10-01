const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();      
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
}

startServer();  