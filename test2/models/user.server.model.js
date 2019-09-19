var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    age: String,
    tel: String,
    email: String,
    password: String,
    avatar: String
});

// 创建模型 --- mongoose.model()从模式创建模型
mongoose.model('UserModel', userSchema);
