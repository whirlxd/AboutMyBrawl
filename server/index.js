const express = require("express");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.get("/", (req, res) => {
	res.send("Welcome to Starr Park!");
});
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
