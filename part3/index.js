const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person.js')
// const cors = require('cors')

const app = express()

// app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (req, res) => {
    res.send(`
        <p> Welcome to the Home Page </p>
    `)
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then((persons) => {
            res.json(persons)
        })
        .catch((err) => {
            res.json({ error: `Failed Displaying persons: ${err.message}` })
        })
});

app.get('/info', (req, res) => {
    const timeNow = new Date()
    Person.countDocuments({})
        .then((length_) => {
            res.send(`
                <p> Phonebook ha info for ${length_} people </p>
                <p> ${timeNow} </p>
            `)
        })
        .catch((err) => {
            res.json({ error: `Failed geting persons length: ${err.message}` })
        })

});


app.get('/api/persons/:id', (req, res) => {
    const ide = req.params.id
    Person.findById(ide)
        .then((person) =>{
            if (person) {
                res.json(person)
            } else {
                res.status(404).json({error: 'person not found in db'})
            }
        })
        .catch((err) => {
            res.json({ error: `Failed retrving person by id: ${err.message}` })
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id_ = req.params.id
    Person.findByIdAndDelete(id_)
        .then((person) => {
            res.status(200).json({message: `${person.name} successfully deleted`})
        })
        .catch((err) => {
            res.status(404).json({error: 'deleting failed from db'})
        })
})

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ error: "name or number is missing" })
    }

    Person.exists({ name: body.name })
        .then((personExists) => {
            if (personExists) {
                return res.status(400).json({ error: "name must be unique" })
            }

            Person.create({
                name: body.name,
                number: body.number
            }).then((person) => {
                return res.json(person)
            })
        })
        .catch((err) => {
            res.status(400).json({error: 'adding new person failed'})
        })

})

// update person add the rout here


const PORT = process.env.PORT || 3001
app.listen(PORT,
    console.log(`Server running on port ${PORT}`)
)
