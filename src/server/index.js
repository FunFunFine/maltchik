#!/usr/bin/env nodejs

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// import passport from 'passport';
// import mongoose from 'mongoose';
// import session from 'express-session';
import cookieParser from 'cookie-parser';

// const mongoHost = process.env.MONGO_HOST || 'localhost';
// const mongoPort = process.env.MONGO_PORT || 27017;
// const databaseName = 'staff-db';
// const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${databaseName}`;

// passport.use(new LocalStrategy(
//     async function (username, password, done) {
//         const user = await usersCollection.findUserByUsername(username).catch(() => null);
//         if (!user) {
//             return done(null, false, { message: 'Unknown User' });
//         }
//         if (!matchPasswordHashes(password, user.password)) {
//             return done(null, false, { message: 'Invalid password' });
//         }
//         return done(null, user);
//     }
// ));
//
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(async (id, done) => {
//     const user = await usersCollection.findUser(id);
//     done(null, {
//         username: user.username,
//         id: user.id,
//         biography: user.biography,
//         chatId: user.chatId
//     });
// });

export const app = express();
const staticPath = path.join(__dirname, '../../dist/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticPath));
// app.use(session({
//     store: new MongoStore({
//         url: mongoUrl
//     }),
//     secret: sessionsSecretKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));
// app.use(passport.initialize());
// app.use(passport.session(sessionsSecretKey));
app.use(cookieParser());
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).end('Internal server error.');
});


app.get('/', function (request, response) {
    response.sendFile('index.html', { root: staticPath });
});
