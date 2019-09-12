function checkLogin(req, res, next) {
    if (!req.session.user) {
        console.log('未登录！');
       req.flash('error', '未登录！');
       return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录');
        return res.redirect('back');
    }
    next();
}

module.exports = {
    checkLogin,
    checkNotLogin
};