import cors from "cors"
import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import { Flower } from "./models/Flower.js"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/flowers-database"
mongoose.connect(mongoUrl)

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())



app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json({
    message: "Welcome to the Flower API",
    endpoints: endpoints
  })
})

app.get("/flowers", async (req, res) => {
  const { color, symbol } = req.query

  //localhost:8080/flowers?color=Red&symbol=love&page=2
  // let filteredFlowers = await Flower.find()

  const query = {}

  if (color) {
    query.color = color
  }

  if (symbol) {
    query.symbolism = symbol
  }

  try {
    const filteredFlowers = await Flower.find(query)

    if (filteredFlowers.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No flowers found for that query. Try another one."
      })
    }
    res.status(200).json({
      success: true,
      response: filteredFlowers,
      message: "Success"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch flowers"
    })
  }
})

app.get("/flowers/:id", async (req, res) => {
  const { id } = req.params
  //localhost:8080/flowers/${id}

  try {
    const flower = await Flower.findById(id)

    if (!flower) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Flower not found"
      })
    }

    res.status(200).json({
      success: true,
      response: flower
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Flower couldn't be found"
    })
  }
})

app.post("/flowers", async (req, res) => {
  const { name, color } = req.body

  try {
    const newFlower = await new Flower({ name, color }).save()

    res.status(201).json({
      success: true,
      response: newFlower,
      message: "Flower created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error, //Be careful when returning error messages to the client, so that you don't expose sensitive information
      message: "Couldn't create flower"
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
