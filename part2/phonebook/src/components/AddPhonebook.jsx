const AddPhonebook = ({
	persons,
	setPersons,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	personsService,
	showNotification,
}) => (
	<form onSubmit={(event) => {
		event.preventDefault()
		const existingPerson = persons.find((person) => person.name === newName)

		if (existingPerson) {
			if (!window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
				return
			}

			const updatedPerson = { ...existingPerson, number: newNumber }
			personsService.update(existingPerson.id, updatedPerson).then((data) => {
				setPersons((currentPersons) => currentPersons.map((person) =>
					person.id === existingPerson.id ? data : person,
				))
				showNotification(`Updated number for ${existingPerson.name}`)
			})
		} else {
			personsService.create({ name: newName, number: newNumber }).then((data) => {
				setPersons((currentPersons) => currentPersons.concat(data))
				showNotification(`Added ${newName}`)
			})
		}

		setNewName('')
		setNewNumber('')
	}}>
		<div>
			name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
		</div>
		<div>
			number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

export default AddPhonebook
