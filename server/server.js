const express = require('express')
const app = express()
const apiRouter = require('./routes')

app.use(express.json())

app.use('/core/api', apiRouter)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/core/api')
})
