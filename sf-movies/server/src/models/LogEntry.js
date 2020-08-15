const mongoose = require('mongoose');
const { Schema } = mongoose;

const NumberReq = {
	type: Number,
	require:true
};

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
		...NumberReq,
		min: -90,
		max: 90
	},
	longitude: {
		...NumberReq,
		min: -180,
		max: 180
	},
	funFact: String,
	productionComp: String,
	distributor: String,
	director: String,
	writer: String,
  mainActor: String
});

const LogEntry = mongoose.model('LogEntry', logSchema);

module.exports = LogEntry;
