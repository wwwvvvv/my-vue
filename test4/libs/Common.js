var me = {
    regex: {
        mobile: /^1[0-9]{10}$/
    },
    trim(str) {
        if (!str) {
            return;
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
};

module.exports = me;