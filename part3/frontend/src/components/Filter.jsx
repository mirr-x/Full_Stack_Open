const Filter = ({ nameFilted, setNameFilted }) => (
	<div>
		filter shown with <input value={nameFilted} onChange={(event) => setNameFilted(event.target.value)} />
	</div>
)

export default Filter
