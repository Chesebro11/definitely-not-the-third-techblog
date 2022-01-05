// basic requires
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// require for connecting public folder
const path = require('path');

// handlebars stuff
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// express session
const session = require('express-session');

// require for sessions user stuff
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: 'This is super secret!',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const PORT = process.env.PORT || 3001;
const app = express();

// setting handlebars as the engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// lots of .use stuff
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// join public folder path
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
// enable routes
app.use(routes);

sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`))
});