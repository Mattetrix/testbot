const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = (".urss");




bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('Drinking Vodka').catch(console.error)
});
    

bot.on('message', message => {
    if (message.content === 'rebootexec') {
      message.reply('Reboot exécuté ! Le bot va redemarrer !')
       message.reply('Le BOT à redémarré !')
    }
  })


bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue camarade,au travail sinon c'est le goulag qui t'attends' + member.displayName)
  }).catch(console.error)
    
    

   
})

bot.on('message', message => {

  if (message.content.startsWith('URSS.play')) {
    // On récupère le premier channel audio du serveur
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first()
    let args = message.content.split(' ')
    // On rejoint le channel audio
    voiceChannel
      .join()
      .then(function (connection) {
        // On démarre un stream à partir de la vidéo youtube
        let stream = YoutubeStream(args[1])
        stream.on('error', function () {
          message.reply("Je n'ai pas réussi à lire cette vidéo :(")
          connection.disconnect()
        })
        
        connection
          .playStream(stream)
          .on('end', function () {
            connection.disconnect()
          })
      })
  }

})
  


bot.on('message', msg => {
    if (msg.content === prefix + "site"){
        msg.channel.send("https://fr.wikipedia.org/wiki/Union_des_républiques_socialistes_soviétiques")
        console.log("Un camarade en plus")
    }

});

bot.login(process.env.TOKEN);
