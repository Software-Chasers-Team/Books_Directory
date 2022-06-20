'use strict';
///async await for methods???? I think need
class DataCollection {

    constructor(model) {
        this.model = model;
    }
    get(id) {
        if (id) {
            return this.model.findOne({where:{id:id}});
        } else {
            return this.model.findAll({});
        }
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data) {
        return this.model.findOne({where: {id:id}})
            .then(record => record.update(data));
    }

    delete(id) {
        return this.model.destroy({where: { id : id  } });
    }
}

module.exports = DataCollection;