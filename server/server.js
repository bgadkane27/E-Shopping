const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth/auth-route");
const adminProductsRoute = require("./routes/admin/products-route");
const adminOrderRoute = require("./routes/admin/order-route");

const shopProductRoute  = require("./routes/shop/products-route");
const shopCartRoute = require("./routes/shop/cart-route");
const shopAddressRoute = require("./routes/shop/address-route");
const shopOrderRoute = require("./routes/shop/order-route");
const shopSearchRoute = require("./routes/shop/search-route");
const shopReviewRoute = require("./routes/shop/review-route");

const PORT = process.env.PORT || 5000;
const app = express();

const mongoDBURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://adkaneb:Password%231@cluster0.y2q5d.mongodb.net/";
mongoose
  .connect(mongoDBURI)
  .then(() => console.log("MongoDB Conneted"))
  .catch((e) => console.log("Error connecting to MongoDB :", e));

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
app.use("/api/admin/orders", adminOrderRoute);

app.use("/api/shop/products", shopProductRoute);
app.use("/api/shop/cart", shopCartRoute);
app.use("/api/shop/address", shopAddressRoute);
app.use("/api/shop/order", shopOrderRoute);
app.use("/api/shop/search", shopSearchRoute);
app.use("/api/shop/review", shopReviewRoute);

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});

