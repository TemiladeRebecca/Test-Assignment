import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import uploadRoutes from './routes/upload.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import notificationRoutes from './routes/notification.js'
import saleRoutes from './routes/sale.js'
import taskRoutes from './routes/task.js'
import eventRoutes from './routes/event.js'
import approvalRoutes from './routes/approval.js'
import leadRoutes from './routes/lead.js'
import followUpRoutes from './routes/followUp.js'
import cashbookRoutes from './routes/cashbook.js'
import refundRoutes from './routes/refund.js'
import voucherRoutes from './routes/voucher.js'
import deductionRoutes from './routes/deduction.js'
import transcriptRoutes from './routes/transcript.js'
import projectRoutes from './routes/project.js'
import societyRoutes from './routes/society.js'
import inventoryRoutes from './routes/inventory.js'

dotenv.config()
const app = express()

// ⬇️ Use local MongoDB for testing
const CONNECTION_URL = process.env.COMPASS_URL
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Serving static files (images)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use('/uploads', express.static(join(__dirname, 'uploads')))

// Routes
app.use('/api/v1', uploadRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/notification', notificationRoutes)
app.use('/api/v1/task', taskRoutes)
app.use('/api/v1/event', eventRoutes)
app.use('/api/v1/approval', approvalRoutes)
app.use('/api/v1/sale', saleRoutes)
app.use('/api/v1/lead', leadRoutes)
app.use('/api/v1/project', projectRoutes)
app.use('/api/v1/society', societyRoutes)
app.use('/api/v1/inventory', inventoryRoutes)
app.use('/api/v1/followUp', followUpRoutes)
app.use('/api/v1/cashbook', cashbookRoutes)
app.use('/api/v1/refund', refundRoutes)
app.use('/api/v1/voucher', voucherRoutes)
app.use('/api/v1/deduction', deductionRoutes)
app.use('/api/v1/trasncript', transcriptRoutes)

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the server')
})

// Error handler
app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong.'
    const status = err.status || 500
    res.status(status).json({ message, status, stack: err.stack })
    next()
})

// Debug log before connecting to MongoDB
console.log('Connecting to MongoDB at:', CONNECTION_URL)

// Connect to MongoDB and start server
mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log('MongoDB connection established successfully')
        app.listen(PORT, () => console.log(`Server listening at port ${PORT}`))
    })
    .catch((err) => console.log('Error connecting to MongoDB =\n', err))
