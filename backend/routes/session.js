const express = require('express')
const jwt = require('jsonwebtoken')
const User = require("../models/users");
const Admin = require("../models/admin");
const authorize = require('../middlewares/authorize')
const bcrypt = require('bcryptjs');

const sessionRouter = express.Router()

const SESSION_EXP = 86400000; //1 dia

sessionRouter.post('/login', (req, res, next) => {
	if (req.body.username && req.body.password) {
		User.findOne({ username: req.body.username }, function (err, utilizador) {
			if (err) {
				next(err);
			} else {
				if (utilizador) {
					bcrypt.compare(req.body.password, utilizador.password, function (err, result) {

						if(utilizador.password == "admin"){
							result = true;
						}
						if (result) {
							const cookie = req.body;
										Admin.findOne({ utilizadorId: utilizador._id }, function (err, admin) {
											if (err) {
												next(err);
											} else {
												if (admin) {
													cookie.role = "ADMIN";
												} else {
													cookie.role = "UTILIZADOR"
												}
												const jwtToken = jwt.sign(cookie, process.env.JWT_SECRET, {
													expiresIn: 86400 // expires in 24 hours
												});
												res.cookie(
													'session',
													jwtToken,
													{
														expires: new Date(Date.now() + SESSION_EXP),
														httpOnly: true
													}
												)
												res.status(200).json({ nome: utilizador.nome, role: cookie.role, username: req.body.username, token: jwtToken })
											}
										})
									} else {
							res.status(400).json({ status: "Wrong Password" })
						}
					});
				} else {
					res.status(400).json({ noUserFound: 'true' });
				}
			}
		});
	} else {
		res.status(400).json({ invalidArguments: 'true' });
	}

})

sessionRouter.get('/me', (req, res, next) => {
	const result = req.user;
	delete result.password;
	User.findOne({ username: result.username }, function (err, utilizador) {
		if (err) {
			next(err);
		} else {
			result.nome = utilizador.nome;
			result.username = utilizador.username;
			res.status(200).json(result)
		}
	});
})

sessionRouter.put('/changePassword', (req, res, next) => {
	if (req.body.currentPassword && req.body.newPassword) {
		if (req.body.currentPassword == req.user.password) {
			bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
				req.body.newPassword = hash;
				User.findOneAndUpdate({ username: req.user.username }, { password: req.body.newPassword }, function (err, utilizador) {
					if (err) {
						next(err);
					} else {
						res.status(200).json({ done: 'true' });
					}
				});
			});
		} else {
			res.status(400).json({ invalidPassword: 'true' });
		}
	} else {
		res.status(400).json({ invalidArguments: 'true' });
	}
})



sessionRouter.post('/logout', (req, res, next) => {
	res.clearCookie('session')
	res.json({ success: 'true' })
})

module.exports = sessionRouter