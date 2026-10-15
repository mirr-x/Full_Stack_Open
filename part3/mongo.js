const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, {family: 4})
    .then((rus) => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log(`error connecting to MongoDB ${err.message}`)
        process.exit(1)
    })

const Person = new mongoose.Schema({
    name: String,
    number: String
})

Person.set