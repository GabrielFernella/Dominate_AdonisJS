'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table
        .integer('user_id') //nome do campo
        .unsigned() //Força que o resultado seja positivo
        .references('id') //nome do campo que queremos referenciar
        .inTable('users') //Em qual tabela queremos referenciar
        .onUpdate('CASCADE') //Se sofrer alguma alteraçãona tabela de user, essa tabela tbm sofrerá alteração
        .onDelete('SET NULL') //se o usuário for deletado o user_id passa a ser nulo
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
