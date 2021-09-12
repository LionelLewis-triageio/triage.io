import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './Models/User'
import { Register } from './Pages/Register';

const LocalStrategy = passportLocal.Strategy

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
        saveUninitialized: true
    })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


/**** Passport ****/
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username : username }, (err, user : any) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result == true) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        });
    });
})
);

passport.serializeUser((user : any, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id : string, cb) => {
    User.findOne({_id: id}, (err, user : any) => {
        const userInformation = {
            username: user.username,
            isAdmin: user.isAdmin
        };
        cb(err, userInformation)
    });
});


/**** Routes ****/
app.post('/register', async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if(!username || !password || typeof username !== "string" || typeof password !== "string") {
        res.send("Improper Values");
        return;
    }

    User.findOne({ username }, async (err : Error, doc : Register) => {
        if (err) throw err;
        if (doc) res.send('User already exists');
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
              username,
              password: hashedPassword,
            });
            await newUser.save();
            res.send("Success");
        };
    });  
});

app.post('/login', passport.authenticate("local", (req, res) => {
    res.send("Successfully Authenticated")
}));

app.get('/user', (req, res) => {
    res.send(req.user)
});

app.listen(4000, () => {
    console.log("🚀 Server Started");
})