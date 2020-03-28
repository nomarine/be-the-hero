
exports.up = function(knex) {
    return knex.schema.dropTable('incidents');
};

exports.down = function(knex) {
  
};
