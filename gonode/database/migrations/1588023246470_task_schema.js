'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table
        .integer('project_id') //nome do campo
        .unsigned() //Força que o resultado seja positivo
        .references('id') //nome do campo que queremos referenciar
        .inTable('users') //Em qual tabela queremos referenciar
        .onUpdate('CASCADE') //Se sofrer alguma alteraçãona tabela de user, essa tabela tbm sofrerá alteração
        .onDelete('CASCADE') //se o PROJETO for deletado, as taferas tbm serão deletadas automaticamente
        .notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      table.timestamp('due-date') //qual data essa tarefa deverá estar atualizada

      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
