require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
// const { Server } = require('socket.io')
const cors = require('cors')
const authRoute = require('./route/userRoute')
const coinRoute = require('./route/coinRoute')
const verifyRoute = require('./route/accountVerify')
const countLikeRoute = require('./route/countLikeRoute')
const commentRoute = require('./route/comment_userRoute')

const http = require('http')
const server = http.createServer(app)

// const bodyParser = require('body-parser');
// const pino = require('express-pino-logger')();
// const client = new Client(sid, tkn);
const accountSid = "AC1cc8e4d358f97b816bc11a1b32a8aadb"; // Your Account SID from www.twilio.com/console
const authToken = "ffe2f273ce795eeb5d2b583e59caae5f";   // Your Auth Token from www.twilio.com/console
var client = require('twilio')(accountSid, authToken);
// const delay = require('delay')
const connectDB = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@coinlist.z0nrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log("mogoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

// start server socket io

// const { Server } = require('socket.io')

// const io = new Server(server);

// io.on("connection", (socket) => {
//     console.log(socket);
// });


// async function getAllPriceChart() {
//     while (true) {
//         const priceChart = 31750 + Math.random() * 400
//         io.emit('bitcoin-price', { priceChart: priceChart.toFixed(2) })
//         await delay
//     }
// }
// getAllPriceChart()
// var connectionOptions = {
//     "force new connection": true,
//     "reconnectionAttempts": "Infinity",
//     "timeout": 10000,
//     "transports": ["websocket"]
// };
// const io = require("socket.io")(httpServer, {
//     cors: {
//         origin: "http://localhost:8080",
//         methods: ["GET", "POST"]
//     }
// });
// io.connect('https://api.coingecko.com/api/v3/', connectionOptions);

app.get('/', (req, res) => res.send('hello world'))
server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 5000');
});



connectDB()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())


// app.use(pino);
// const app = express()
app.use('/api/auth', authRoute)
app.use('/api/coin', coinRoute)
app.use('/api/account', verifyRoute)
app.use('/api/like_author', countLikeRoute)
app.use('/api/comment_user', commentRoute)
app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json')
    console.log(req.body);
    client.messages
        .create({
            from: "+15005550001",
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});



app.use(express.static('public'));//sử dụng folder public để render img