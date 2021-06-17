const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
port = 5000;

const app = express();

// middleware

// YOUR CAN USE MORE THAN ONE MIDDLEWARE

// 1. First middleware
// app.use(morgan("dev"))

// 2. Second middleware
// app.use((req, res, next) => {
//   console.log("our middleware");
//   next();
// });

// 3. Third middleware
app.use(cors());

// 4. Fourth middleware
app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// Get Individual restaurants
app.get("/api/v1/restaurants/:restaurantid", async (req, res) => {
  try {
    const restaurants = await db.query(
      `SELECT * FROM restaurants WHERE id = ${req.params.restaurantid}`
      // You can also use this
      // "SELECT * FROM restaurants WHERE id = $1", [req.params.restaurantid]
    );
    const reviews = await db.query(`SELECT * FROM reviews WHERE id=$1`, [
      req.params.restaurantid]);
    console.log(restaurants.rows);
    console.log(req.params);
    console.log(reviews)
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurants.rows[0],
        review: reviews.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// create restaurants
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results.rows);
    console.log(req.body);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id=$4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(results);
    console.log(req.params);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// delete restaurnats
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id=$1", [
      req.params.id,
    ]);
    console.log(results);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
