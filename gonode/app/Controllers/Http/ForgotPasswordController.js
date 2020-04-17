'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')   //utilize input quando precisar buscar um único parametro
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        //No Array adiante vc pode inserir mais de um aquivo somente de texto para o usuário, para evitar que seu dominio ploqueie qualquer tipo de email.
        ['emails.forgot_password'],
        //Nas chaves adiante, estamos adicionando as variaveis que passaremos como parametro, o token por exemplo, para ele entrar no formulário já autenticado.
        //Em redirect_url o front end irá adicionar o endereço do formulário de recuperação de senha
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`},
        message => {
        message
          .to(user.email)
          .from('teste@gmail.com', 'Email de Teste')
          .subject(`Recuperação de senha do ${user.username}`)
      })

    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo não deu certo, esse e-mail existe?' }})
    }
  }
}

module.exports = ForgotPasswordController
