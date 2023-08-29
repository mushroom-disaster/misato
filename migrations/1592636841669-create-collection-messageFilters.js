const {MongoClient} = require('mongodb');
const {MONGODB_CONNECTION_URI, MONGODB_DATABASE} = process.env;

module.exports.up = async () => {
	const mongoClient = new MongoClient(MONGODB_CONNECTION_URI, {useUnifiedTopology: true});
	await mongoClient.connect();
	const db = mongoClient.db(MONGODB_DATABASE);

	await db.createCollection('messageFilters', {
		validator: {
			$jsonSchema: {
				bsonType: 'object',
				required: ['guildID', 'rule'],
				properties: {
					guildID: {
						bsonType: 'string',
					},
					rule: {
						bsonType: 'object',
					},
				},
			},
		},
	});
};

module.exports.down = async () => {
	const mongoClient = new MongoClient(MONGODB_CONNECTION_URI, {useUnifiedTopology: true});
	await mongoClient.connect();
	const db = mongoClient.db(MONGODB_DATABASE);

	await db.dropCollection('messageFilters');
};
