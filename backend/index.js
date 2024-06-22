import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

// Initialize server
const app = express();

// Plugin for reading JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors and bodyParser
app.use(cors());
app.use(bodyParser.json())

// Import router
import router from './routes/router.js';
router(app);


// Server listens at Port 3001
app.listen(3001, () => { console.log("API listening at port 3001.") });