const db = require("../database/dbConfig");

module.exports = {
    getAll,
    add,
    findBy,
    findById
}

function getAll(){
    return db("users")
    .select("id", "username")
    .orderBy("id")
};

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