import { useEffect, useState } from 'react'
import AddPhonebook from './components/AddPhonebook'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilted, setNameFilted] = useState('')
  const [notification, setNotification] = useState(null)

  const showNotification = (message) => {
    setNotification(message)
  }

  useEffect(() => {
    personsService.getAll().then(setPersons)
  }, [])

  useEffect(() => {
    if (!notification) {
      return undefined
    }

    const notificationTimer = setTimeout(() => setNotification(null), 5000)

    return () => clearTimeout(notificationTimer)
  }, [notification])

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilted.toLowerCase()),
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter
        persons={persons}
        nameFilted={nameFilted}
        setNameFilted={setNameFilted}
      />
      <h2>Add a new</h2>
      <AddPhonebook
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        personsService={personsService}
        showNotification={showNotification}
      />
      <h2>Numbers</h2>
      <Numbers
        persons={personsToShow}
        setPersons={setPersons}
        personsService={personsService}
        showNotification={showNotification}
      />
    </div>
  )
}

export default App