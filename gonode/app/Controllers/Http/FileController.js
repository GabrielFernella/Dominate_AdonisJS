'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers') //para trabalhhar com funções de ajuda

class FileController {

  async show ({ params, response }){
    const file = await File.findOrFail(params.id) //Procurar o id do arquivo no banco

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
        if(!request.file('file')) return

        const upload = request.file('file', {size: '2mb'})

        const fileName = `${Date.now()}.${upload.subtype}`

        //Pasta que pode ser configurada nas propriedades do Adonis
        await upload.move(Helpers.tmpPath('uploads'), {
          name: fileName
        })

        if(!upload.moved()){
          throw upload.error()
        }

        const file = await File.create({
          file: fileName,
          name: upload.clientName,
          type: upload.type,
          subtype: upload.subtype
        })

        return file

    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Error ao fazer o upload do arquivo'}})
    }
  }

}

module.exports = FileController
