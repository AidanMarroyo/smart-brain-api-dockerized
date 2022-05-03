const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const morgan = require('morgan')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  // connection: {

  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
})

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('it is working')
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db)
})

app.post('/profile/:id', (req, res) => {
  profile.handleProfileUpdate(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

/*
planning out API endpoints

/ --> res = this is working
/signin --> POST = success/fail
/register -- POST = user
/profile/:userID --> GET = user
/image --> PUT user
*/
