
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var cors = require('cors');

const mongoose = require('mongoose');
const CONSTANTS = require('./constants/all.constants');
const DATABASE = CONSTANTS.DATABASE;
const port = 8080;

const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketIO = require('./socket.io');

// Config Mongoose
mongoose.connect(DATABASE.MLAB, CONSTANTS.CONNECT_OPTION).then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});
mongoose.set('useFindAndModify', false);

// Handle error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message });
});

// App Config
app.use(cors());
app.use(session({
    secret: CONSTANTS.APP_SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use(express.static('resource'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['*']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/** APIs */
const ProductAPI = require('./routes/product.route');
const CategoryAPI = require('./routes/category.route');
const PhotoAPI = require('./routes/photo.route');
const TrailerAPI = require('./routes/trailer.route');
const UserAPI = require('./routes/user.route');
const CartAPI = require('./routes/cart.route');
const RoleAPI = require('./routes/role.route');
const ConversationAPI = require('./routes/conversation.route');

/** Use APIs */
app.use(ProductAPI);
app.use(CategoryAPI);
app.use(PhotoAPI);
app.use(TrailerAPI);
app.use(UserAPI);
app.use(CartAPI);
app.use(RoleAPI);
app.use(ConversationAPI);

// Socket IO 
socketIO(io);

http.listen(port, () => {
    console.log('Server is running port:' + port)
});

module.exports = app;

