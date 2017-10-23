function Entity(id) {
    Object.defineProperties(this,{
        "id":{writable : true, value: id},
        "isActive":{writable : true, value:true}
    });
}
module.exports = Entity;