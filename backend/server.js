const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error('Server failed to start:', error);
    }
};

start();
