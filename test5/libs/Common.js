var me = {
    trim(str) {
        if (!str) {
            return;
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
};

module.exports = me;