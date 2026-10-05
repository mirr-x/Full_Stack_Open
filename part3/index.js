const express = require('express');
const app = express()

app.use(express.json())

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send(`
        <p> Welcome to the Home Page </p>
    `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/info', (req, res) => {
    const timeNow = new Date()
    res.send(`
        <p> Phonebook ha info for ${persons.length} people </p>
        <p> ${timeNow} </p>
    `)
});

app.get('/api/persons/:id', (req, res) => {
    const ide = req.params.id
    const index = persons.findIndex((p) => p.id === ide)

    if (index !== -1){
        res.json(persons[index])
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id_ = req.params.id
    const index = persons.findIndex((p) => p.id === id_)

    if (index !== -1) {
        persons.splice(index, 1)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({"error": "name or number is missing"})
    }

    const person = {
        id: String(Math.floor(Math.random() * 1000000)),
        name: body.name,
        number: body.number
    }

    persons.push(person)
    res.json(person)
})


app.listen(3001,
    console.log("server is runing")
)
