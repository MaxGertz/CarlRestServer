const Authentication = require('./controllers/authentication');
const passport = require('passport');
require('./services/passport');

const User = require('./models/userModel');
const userRouter = require('./routes/userRouter');
const ticketRouter = require('./routes/ticketRouter');
const carparkRouter = require('./routes/carparkRouter');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

	//app.use('/api/user', userRouter);
	app.use('/api/ticket', ticketRouter);
	app.use('/api/carpark', carparkRouter);

	app.get('/', (req, res) => {
		res.send('CarlServer: Express Server with JWT Authentication');
	});

	app.get('/user', requireAuth, function(req, res) {
		console.log(req);
		User.findOne({ name: req.user.name }, (err, user) => {
			if (err) {
				return res.status(422).send(err);
			} else {
				console.log(user);
				res.send(user);
			}

		})
	});

	app.post('/signin', requireSignIn, Authentication.signin);

	app.post('/signup', Authentication.signup);

};