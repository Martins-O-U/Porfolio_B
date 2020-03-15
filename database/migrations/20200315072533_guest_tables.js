exports.up = function (knex) {
    return knex.schema.createTable('usersList', user => {
        user.increments("id");
        user.string('name', 100).notNullable()
        user.string('email', 128).notNullable()
        user.integer('number', 15)
        user.string('comment', 500).notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('usersList')
};