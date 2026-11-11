class NotificadorService {
  async notificar(email) {
    console.log(`Enviando e-mail para ${email}...`);
  }
}

module.exports = NotificadorService;
