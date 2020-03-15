const db = require('../database/db-config');

function getGuestComments() {
    return db("usersList")
        .select('id', 'name', "email", "comment", 'number');
}

function findCommentById(id) {
    return db('usersList')
        .where({ id }).first()
        .select('id', 'name', "email", "comment", 'number');
}

function findCommentByName(filter) {
    return db('usersList')
        .where('full_name', '=', filter).first()
        .select('id', 'name', "email", "comment", 'number')
}

function insertComment(comment) {
    return db('usersList')
        .insert(comment, 'id')
        .then(ids => {
            return findCommentById(ids[0]);
        });
}


module.exports = {
    getGuestComments,
    findCommentById,
    findCommentByName,
    insertComment,
};
