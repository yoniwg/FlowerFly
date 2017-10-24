function Entity(id) {
    Object.defineProperties(this,{
        "id":{writable : true, value: id, enumerable:true},
        "isActive":{writable : true, value:true}
    });
}
module.exports = Entity;