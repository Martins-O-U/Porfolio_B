
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('usersList').del()
    .then(function () {
      // Inserts seed entries
      return knex('usersList').insert([
        { id: 1, name: 'Here Again', email: 'testing@mail.com', comment: "angry", number: 123456789 },
      ]);
    });
};
