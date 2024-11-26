const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth/auth-route");
const adminProductsRoute = require("./routes/admin/products-route");

const PORT = process.env.PORT || 5000;
const app = express();

const mongoDBURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://adkaneb:Password%231@cluster0.y2q5d.mongodb.net/";
mongoose
  .connect(mongoDBURI)
  .then(() => console.log("MongoDB Conneted"))
  .catch((error) => console.log("Error connecting to MongoDB :", error));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Expires", "Pragma", "Cache-Control"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminProductsRoute);

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
