function checkIsLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

function checkIsLogout(req, res, next) {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    checkIsLogin,
    checkIsLogout
}