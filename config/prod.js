module.exports = {
  clarifaiApiKey: process.env.CLARIFAI_API_KEY,
  dbConnection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
};
