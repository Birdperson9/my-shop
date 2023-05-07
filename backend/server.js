const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'))

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

const resolvedPath = path.resolve()
app.use('/uploads', express.static(path.join(resolvedPath, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(resolvedPath, '/frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(resolvedPath, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.send('API is running....')
  })
}

app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
