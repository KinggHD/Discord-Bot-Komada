const config = require('../config/config.json')
exports.run = (client, msg, mes, start) => {
  /* When VG Command run check if they win */
  if (mes === 'vg') {
    /* make a random number from 1 to lottery chance amount */
    const randomChance = Math.floor((Math.random() * parseInt(config.lottery.chance, 10)) + 1)
    /* If they hit #1 the lucky number they win */
    if (randomChance === 1) {
      const embed = new client.methods.Embed()
        .setTitle('Join This Discord And Follow Instruction To Get Your ICE!')
        .setAuthor(`OMG! ${msg.author.tag} You Are The Winner!`, client.user.avatarURL())
        .setColor(0x00AE86)
        .setDescription(`Please go to [Discord](https://discord.gg/VHVY7rb), to claim your ${config.lottery.amount} ICE by sending a direct message to Skillz4Killz with your IGN! No this isn't a scam you really did win ICE for using the EZLBot.`)
        .setFooter('<3 EZL, SEMC', client.user.avatarURL())
        .setImage('https://images-ext-2.discordapp.net/external/aM23KqkTjuvGKo9k2TOgNkB5vvqeYOmonW_b5RzKIcw/https/vaingloryhack.com/wp-content/uploads/2017/03/download.png')
        .setURL('https://discord.gg/VHVY7rb')
      setTimeout(() => {
        msg.channel.send({ embed })
        client.channels.get('358074822678413314').send({ embed }) // LLC Server
        client.channels.get('323559624672411649').send({ embed }) // HH Server
      }, 1000)
    }
  }
}