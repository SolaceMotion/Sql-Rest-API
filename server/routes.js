const { request } = require('express')
const express = require('express')
const db = require('./queries')
const router = express.Router()

router.get('/', (req, res) => {
  db.all()
    .then(results => res.json(results.recordset))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.get('/:id', async (req, res) => {
  try {
    let results = await db.one(parseInt(req.params.id)) //reques id parameter from db
    res.json(results.recordset[0])
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/insert/:value', async (req, res) => {
  try {
    let results = await db.insert(req.params.value)
    res.json(results.recordset)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.put('/update/:id/:name', async (req, res) => {
  const { id, name } = req.params
  try {
    const results = await db.update(parseInt(id), name) //Fill with two parameters
    res.json(results)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const results = await db.delete(parseInt(req.params.id))
    res.json(results.recordset)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
