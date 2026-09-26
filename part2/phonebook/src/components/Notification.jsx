const Notification = ({ notification }) => {
	if (!notification) {
		return null
	}

	return (
		<div style={{ ...styles.notification, ...styles[notification.type] }}>
			{notification.message}
		</div>
	)
}

const styles = {
	notification: {
		margin: '1rem 0',
		padding: '0.75rem 1rem',
		border: '3px solid',
		borderRadius: '0.25rem',
		backgroundColor: '#d3d3d3',
		fontSize: '1.25rem',
	},
	success: {
		borderColor: '#008000',
		color: '#008000',
	},
	error: {
		borderColor: '#cc0000',
		color: '#cc0000',
	},
}

export default Notification