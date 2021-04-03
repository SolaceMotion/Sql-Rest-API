const express = require('express')
const app = express()
const apiRouter = require('./routes')

app.use(express.json())

app.use('/api/core', apiRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
