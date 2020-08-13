const API_URL = 'http://localhost:1337';

async function listLogEntries() {
	const response = await fetch(`${API_URL}/api/logs`);
	return response.json();
};

module.exports={
	listLogEntries
}
