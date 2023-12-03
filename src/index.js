//src/index.js
import express from 'express';
import session from 'express-session';
import login from './login.js';
import resetPasswordRouter from './resetPassword.js';

var app = express();
const port = process.env.PORT || 8080; 

app.use(
  session({
    secret: '21106181D_21103197D_eie4432_group_project',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

const PREAUTH_KEY = '<ChenXuGpProjectKey>';
app.use((req, res, next) => {
    if (!req.session?.allow_access) {
        if (req.query?.authkey === PREAUTH_KEY) {
            req.session.allow_access = true;
        } else {
            res.status(401).json({
                status: 'failed',
                message: 'Unauthorized'
            });
        }
    }
    next();
});

app.use(express.json());

app.use('/auth', login);

app.use('/', resetPasswordRouter);

app.use('/', express.static('static'));

// Redirect based on session status
app.get('/', (req, res) => {
  if (req.session.logged) {
    res.redirect('/index.html');
  } else {
    res.redirect('/register.html');
  }
});

app.listen(port, () => {
  const currentDate = new Date().toLocaleString("en-HK", { timeZone: "Asia/Hong_Kong" });
  console.log(`Current date and time in HKT: ${currentDate}`);
  console.log(`Server started at http://127.0.0.1:${port}`);
});
