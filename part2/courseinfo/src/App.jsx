import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}{' '}
        <button onClick={() => onDelete(person)}>delete</button>
      </p>
    ))}
  </div>
)

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (!window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        return
      }

      const updatedPerson = { ...existingPerson, number: newNumber }
      personService.update(existingPerson.id, updatedPerson).then((data) => {
        setPersons(persons.map((person) =>
          person.id === existingPerson.id ? data : person,
        ))
        showNotification(`Updated number for ${existingPerson.name}`, 'success')
      }).catch(() => {
        showNotification(
          `Information of ${existingPerson.name} has already been removed from server`,
          'error',
        )
      })
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson).then((data) => {
        setPersons(persons.concat(data))
        showNotification(`Added ${newName}`, 'success')
      }).catch(() => {
        showNotification(`Could not add ${newName}`, 'error')
      })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    personService.remove(person.id).then(() => {
      setPersons(persons.filter((personToKeep) => personToKeep.id !== person.id))
      showNotification(`Deleted ${person.name}`, 'success')
    }).catch(() => {
      showNotification(
        `Information of ${person.name} has already been removed from server`,
        'error',
      )
    })
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App