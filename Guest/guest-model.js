const db = require('../database/db-config');

function getGuestComments() {
    return db("guest")
        .select('id', 'full_name', "email_address", "comment", 'number');
}

function findCommentById(id) {
    return db('guest')
        .where({ id }).first()
        .select('id', 'full_name', "email_address", "comment", 'number');
}

function findCommentByName(filter) {
    return db('guest')
        .where('full_name', '=', filter).first()
        .select('id', 'full_name', "email_address", "comment", 'number')
}

function insertComment(comment) {
    return db('guest')
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
