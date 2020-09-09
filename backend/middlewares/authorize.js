const Utilizador = require("../models/users");
const utilizadorController = require("../controllers/userAPI");

const autorizacoes = {
    ["UTILIZADOR"] : ["UTILIZADOR","ADMIN"],
    ["ADMIN"] : ["ADMIN"]
}

const authorize = (opts) => {

	opts = autorizacoes[opts] || []

	return (req, res, next) => {
		if (!req.user) {
			next({message:'Not authenticated',status : 401 })
        } else {
            Utilizador.findOne({ username: req.user.username }, function (err, utilizador) {
                if (err) {
                    next(err);
                } else {
                    if (utilizador.changed){
                        res.clearCookie('session')
                        res.json({ status: 'Need to RE-Login due to changes!',status : 401 })
                        utilizadorController.updateUserInterno(utilizador._id,{changed:false})
                    } else {
                        const hasAuthorization = opts.includes(req.user.role)
            
                        if (hasAuthorization) {
                            next()
                        } else {
                            next({message:'Not authorized',status: 403})
                        }
                    }
                }
            });
        }
	}
}

module.exports = authorize
