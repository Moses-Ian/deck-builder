const withAuth = (req, res, next) => {
	console.log('withAuth');
	if (!req.session.user_id) {
		res.redirect('/login');
		return;
	}
	next();
};

const writeAuth = (req, res, next) => {
	if (req.session.user_id != req.params.id) {
		res.status(401).json({ message: "not authorized" });
		return;
	}
	next();
}

module.exports =
{
	withAuth,
	writeAuth
};