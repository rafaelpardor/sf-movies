const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	releaseYear: Number,
	imgCover: String,
	location: {
		type: String,
		require: true
	},
	latitude: {
		type: Number,
		min: -90,
		max: 90,
	},
	longitude: {
		type: Number,
		min: -180,
		max: 180,
	},
	funFact: String,
	productionComp: String,
	distributor: String,
	director: String,
	writer: String,
	actor1: String,
	actor2: String,
	actor3: String,
});

const LogEntry = mongoose.model('LogEntry', logSchema);

module.exports = LogEntry;
