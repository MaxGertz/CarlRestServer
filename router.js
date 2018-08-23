const Authentication = require('./controllers/authentication');
const passport = require('passport');
require('./services/passport');

const userRouter = require('./routes/userRouter');
const ticketRouter = require('./routes/ticketRouter');
const carparkRouter = require('./routes/carparkRouter');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (app) {

	//app.use('/api/user', userRouter);
	app.use('/api/ticket', ticketRouter);
	app.use('/api/carpark', carparkRouter);

	app.get('/', (req, res) => {
		res.send('CarlServer: Express Server with JWT Authentication');
	});

	app.get('/user', requireAuth, function(req, res) {
    res.send({ user: req.user.name });
});

	app.post('/signin', requireSignIn, Authentication.signin);

	app.post('/signup', Authentication.signup);

};
