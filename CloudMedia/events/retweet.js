const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user, client) {

    let image = ""
        const message = reaction.message;
        if (reaction.emoji.name === "<:retweet:846635554204287006>") {
     //   if (message.author.id === user.id) return;
        if (message.author.bot) return;
        const retweetChannel = message.guild.channels.cache.find(channel => channel.name === "retweets")
        if (!retweetChannel) return message.channel.send(`It appears that you do not have a retweet channel.`); 
        const fetchedMessages = await retweetChannel.messages.fetch({ limit: 100 });
        const retweets = fetchedMessages.find(m =>  m.embeds[0].footer.text.endsWith(message.id));
        if (retweets) {
            

           
            
        
          const foundretweet = retweets.embeds[0];

          let tf = retweets.content.slice("ret<:retweet:846635554204287006>weet").trim().split(/ +/g);

          let tt = sf[2] 

let retweet = parseInt(tt) + 1

          

          if (message.attachments.size > 0) {
           image = message.attachments.first().url;
            }
          
          const embed = new MessageEmbed()
            .setColor(foundretweet.color)
            .setDescription(foundretweet.description)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .addField("Source", `[Jump](${message.url})`)
            .setFooter(`${message.id}`)
            if (message.attachments.size > 0) {
                embed.setImage(image)
                }
          await retweets.edit({ content: `ret<:retweet:846635554204287006>weet** ${retweet} **<#${message.channel.id}>`, embeds: [embed] });
        }
        if (!retweets) {
            if (message.attachments.size > 0) {
                 image = message.attachments.first().url;
                }
          const embed = new MessageEmbed()
            .setColor("#f9f9f9")
            .setDescription(message.content)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTimestamp(new Date())
            .setFooter(`${message.id}`)
            .addField("Source", `[Jump](${message.url})`)

            if (message.attachments.size > 0) {
            embed.setImage(image)
            }
          await retweetChannel.send({ content: `ret<:retweet:846635554204287006>weet ** 1 ** <#${message.channel.id}>`, embeds: [embed] });
        } 
    } 

}}