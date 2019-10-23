var crypto = require('crypto');
var me = {
    regex: {
        mobile: /^1[0-9]{10}$/
    },
    resJson (res, err, data, msg) {
        let ret = {};
        ret.success = !err;
        if (err) {
            if (typeof err === 'object') {
                ret.msg = err.message;
            } else if (typeof err === 'string') {
                ret.msg = err;
            }
        }
        if (msg) {
            ret.msg = msg;
        }
        if (data !== undefined) {
            ret.data = data;
        }
        res.json(ret);
    },
    cryptoPassword (password) {
        return crypto.createHash('md5').update(password).digest('hex');
    },
    trim(str) {
        if (!str) {
            return;
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
};

module.exports = me;