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
    let results = await db.one(req.params.id) //request id parameter from db

    if (results.rowsAffected[0] === 0) {
      //Check to see if any rows are selected
      return res
        .status(404)
        .json({ message: `Cannot fetch. Id "${req.params.id}" does not exist` })
    }
    res.json(results.recordset[0])
  } catch (err) {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: err.message }) //if pass in a string
    }
    res.sendStatus(500) //server error
  }
})

router.post('/insert/:value', async (req, res) => {
  try {
    let results = await db.insert(req.params.value)
    res.sendStatus(201).json(results.recordset)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.put('/update/:id/:name', async (req, res) => {
  const { id, name } = req.params
  try {
    const results = await db.update(id, name) //Fill with two parameters

    if (results.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: `Cannot update. Id "${id}" does not exist` })
    }
    res.json(results)
  } catch (err) {
    if (isNaN(id)) {
      return res.status(400).json({ message: err.message }) //if pass in a string
    }
    res.sendStatus(500)
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const results = await db.delete(parseInt(req.params.id))

    if (results.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: `Cannot Delete. Id "${req.params.id}" does not exist`,
      })
    }
    res.json(
      results.rowsAffected[0] === 1
        ? { message: `Deleted ${results.rowsAffected} record` }
        : { message: `Deleted ${results.rowsAffected} records` }
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
