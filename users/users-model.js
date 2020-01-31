const db = require("../database/dbConfig");

module.exports = {
    add,
    findBy,
    findById
}

function add(user){
    return db("users")
    .insert(user)
};

function findBy(filter){
    return db("users")
    .where(filter);
};

function findById(id){
    return db("users")
    .where({ id })
    .first();
}