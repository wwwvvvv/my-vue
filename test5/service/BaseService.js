class BaseService {
    constructor (model) {
        this.Model = model;
    }

    _retResult (resolve, reject, err, doc) {
        if (err) {
            reject(err);
            return;
        }
        resolve(doc);
    }

    insertOne (data) {
        console.log('data ---------', data);
        return new Promise ((resolve, reject) => {
            let Model = this.Model;
            let newEntity = new Model(data);
            newEntity.save((err, doc) => {
                this._retResult(resolve, reject, err, doc);
            });
        });
    }

    findOne (condition) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition,(err, doc) => {
                this._retResult(resolve, reject, err, doc);
            });
        })
    }

    find(query) {
        // query = this.Model.find(query);
        // query
        return new Promise((resolve, reject) => {
            // this.Model.find(query, 'name age', (err, docs) => {
            //     ;
            // });
            query = this.Model.find(query);
            console.log('query', query);
            query.select('name age tel');
            query.exec((err, docs) => {
                this._retResult(resolve, reject, err, docs)
            });
        })
    }
}

module.exports = BaseService;