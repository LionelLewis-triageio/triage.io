import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

mongoose.connect("mongodb+srv://lionellewis:z3n_C0n50rt1um@triage-io.vwadk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    (err: Error) => {
        if (err) throw err;
        console.log("🚀 Connected to MongoDB");
    }
);

/**** Middleware ****/
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());