function checkIsLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

function checkIsLogout(req, res, next) {
    if (req.session.user) {
        return res.json({
            success: false,
            err: '您已登录'
        })
    }
    next();
}

module.exports = {
    checkIsLogin,
    checkIsLogout
}