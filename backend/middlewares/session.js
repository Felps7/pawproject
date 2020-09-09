const jwt = require('jsonwebtoken')

process.env.JWT_SECRET = 'this is for development'

const sessionMiddleware = (req, res, next) => {
	const sessionStr = req.cookies.session
	try {
		if (sessionStr) {
			const user = jwt.verify(sessionStr, process.env.JWT_SECRET)
			req.user = user
		} else if(req.headers["x-access-token"]) {
			
			const user = jwt.verify(req.headers["x-access-token"], process.env.JWT_SECRET)
			req.user = user
		} else {
			req.user = null
		}
	} catch(e) {
		req.user = null
	}
	next()
}

module.exports = sessionMiddleware