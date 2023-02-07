const { hash } = require('bcryptjs')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const body = {...req.body}
  
    if (!body.username || !body.password) {
      return res.status(400).send({
        error: 'Username and password are required'
      })
    }
  
    const salt = bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(body.password, salt)
    console.log(passwordHash)
    delete body.password
    body.passwordHash = passwordHash
    
    try {
        await User.create(body)
        res.status(201).send({
          message: 'User created successfully',
          data: {
            username: body.username
          }
        })
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).send({
            error: 'Username already exists'
          })
        } else {
          return res.status(500).send({
            error: 'Could not create user'
          })
        }
      }
})

module.exports = router;
