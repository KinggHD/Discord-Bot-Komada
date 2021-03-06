const { Command } = require('klasa')
const Vainglory = require('vainglory')
const config = require('../../config/config.json')
const crypto = require('../../functions/crypto/crypto')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'savevg',
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      cooldown: 0,
      aliases: ['save'],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: 'Save your IGN and Region in the database!',
      quotedStringSupport: true,
      usage: '[username:str] [server:str]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (msg, [username, server]) {
    if (!username || !server) return msg.reply('You didn\'t provide an IGN or a region. Please try again.')
    const allowedRegions = ['na', 'eu', 'sa', 'sea', 'cn', 'ea']
    let region = server.toLowerCase()
    if (!allowedRegions.includes(region)) return msg.reply(`${server} is not an allowed region. Allowed region are \`${allowedRegions.join('`, `')}\``)
    let ign = username
    const vainglory = new Vainglory(config.vgKey)
    /* Must take an array */
    const playerNames = [ign]
    await vainglory.region(region !== 'sea' ? region : 'sg').players.getByName(playerNames).then(async (players) => {
      if (players.errors) {
        console.log(players)
        return msg.reply('Sorry that account do not exist in the API. Please try again.')
      }
      let nickname = `${ign} - ${region.toUpperCase()}`
      if (msg.guild.id === config.ezl.id) msg.member.setNickname(nickname)
      ign = await crypto.encrypt(ign)
      region = await crypto.encrypt(region)
      await this.client.settings.users.update(msg.author, { ign: ign, region: region }, msg.guild)
      return msg.reply(`Your IGN and Region are now saved into the database and now the bot will know who you are on all the ${this.client.guilds.size} servers.`)
    })
  }
}
