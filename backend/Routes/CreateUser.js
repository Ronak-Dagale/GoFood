const express = require('express')

const router = express.Router()
const { check, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const jwtSecret = 'MynameisRonakDagale$#'
router.post(
  '/createuser',
  [
    check('email').isEmail(),
    check('name').isLength({ min: 5 }),
    check('password', 'Incorrect Password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() })
    }

    // To secure the password
    const salt = await bcrypt.genSalt(10)
    let secpassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        geolocation: req.body.geolocation,
        email: req.body.email,
        password: secpassword,
      })
      res.json({ success: true })
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  }
)

router.post(
  '/loginuser',
  [
    check('email').isEmail(),
    check('password', 'Incorrect Password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let email = req.body.email
    try {
      let userData = await User.findOne({ email: email })

      if (!userData) {
        return res
          .status(400)
          .json({ errors: 'Try login with Correct Credentials' })
      }

      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        userData.password
      )

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ errors: 'Try login with Correct Credentials' })
      }

      const data = {
        user: {
          id: userData.id,
        },
      }

      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken: authToken })
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  }
)

module.exports = router
