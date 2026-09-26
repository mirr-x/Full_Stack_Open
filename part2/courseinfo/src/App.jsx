import axios from 'axios'
import { useEffect, useState } from 'react'

const baseUrl = 'https://legendary-orbit-4pp54x54xgvcx4r-3001.app.github.dev/persons'

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({
  name,
  number,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber, id: Date.now() }))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumberChange={(event) => setNewNumber(event.target.value)}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App