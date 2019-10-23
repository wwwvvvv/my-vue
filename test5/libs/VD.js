var Common = require('./Common');

//所有数据的校验器
var validators = {
    _ret (ok, msg) {
        let ret = {ok};
        if (!ok) {
            ret.msg = msg;
        }
        return ret;
    },
    number (key, value) {
        value = Common.trim(value);
        let msg = `${key} 必须是数字`;
        let ok = !isNaN(+value);
        return this._ret(ok, msg);
    },
    required (key, value) {
        console.log('required', key);
        let msg = `${key || ''}必填！`;
        let ok = true;
        if (value === null || value === undefined || (typeof value === 'string' && !value)) {
            ok = false;
        }
        return this._ret(ok, msg);
    },
    mobile (key, value) {
        value = Common.trim(value);
        let msg = '手机号码格式错误！';
        let ok = Common.regex.mobile.test(value);
        return this._ret(ok, msg);
    },
    checkPassword (key, value, map) {
        let {rePassword} = map;
        value = Common.trim(value);
        rePassword = Common.trim(rePassword);
        let msg = '两次输入的密码不一致';
        let ok = rePassword === value;
        return this._ret(ok, msg);
    }
};



module.exports = {
    validateOne (key, value, validator, map) {
        if (validators[validator]) {
            return validators[validator](key, value, map);
        }
        return {ok: false}
    },
    validateParams (map, keys) {
        let me = this;
        for (let key in keys) {
            let value = map[key];
            let validators = keys[key];

            if (typeof validators === 'string') {
                validators = [validators];
            }

            for (let validator of validators) {
                if (!validator) {
                    validator = 'required'
                }
                console.log(key, value, validator);
                let ret = me.validateOne(key, value, validator, map);
                if (!ret.ok) {
                    return new Error(ret.msg); // new Error('错误提示') ----> 错误提示被存到Error实例的message字段里面
               }
            }
        }
        return null;
    }
};
