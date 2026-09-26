const Notification = ({ message }) => {
	if (!message) {
		return null
	}

	return <div style={styles.notification}>{message}</div>
}

const styles = {
	notification: {
		margin: '1rem 0',
		padding: '0.75rem 1rem',
		border: '3px solid #008000',
		borderRadius: '0.25rem',
		color: '#008000',
		backgroundColor: '#d3d3d3',
		fontSize: '1.25rem',
	},
}

export default Notification