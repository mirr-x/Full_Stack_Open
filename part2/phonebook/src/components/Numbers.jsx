const Numbers = ({ persons, setPersons, personsService, showNotification }) => (
	<div>
		{persons.map((person) => (
			<p key={person.id}>
				{person.name} {person.number}{' '}
				<button type="button" onClick={() => {
					if (!window.confirm(`Delete ${person.name}?`)) {
						return
					}

					personsService.remove(person.id).then(() => {
						setPersons((currentPersons) => currentPersons.filter(
							(personToKeep) => personToKeep.id !== person.id,
						))
						showNotification(`Deleted ${person.name}`)
					})
				}}>delete</button>
			</p>
		))}
	</div>
)

export default Numbers
