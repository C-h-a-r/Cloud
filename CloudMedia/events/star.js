const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user, client) {

    let image = ""
        const message = reaction.message;
        if (reaction.emoji.name === "⭐") {

          
if (message.author.id === user.id) return;

        
           if(reaction.message.reactions.cache.get('⭐').count < 5) return; 
        if (message.author.bot) return;
        const starChannel = message.guild.channels.cache.find(channel => channel.name.includes("starboard"))
        if (!starChannel) return message.channel.send(`It appears that you do not have a starboard channel.`); 
        const fetchedMessages = await starChannel.messages.fetch({ limit: 100 });
        const stars = fetchedMessages.find(m =>  m.embeds[0].footer.text.endsWith(message.id));
        if (stars) {
            

           
            
        
          const foundStar = stars.embeds[0];

          let sf = stars.content.slice("🌟").trim().split(/ +/g);

          let st = sf[2] 

let star = parseInt(st) + 1

          

          if (message.attachments.size > 0) {
           image = message.attachments.first().url;
            }
          
          const embed = new MessageEmbed()
            .setColor(foundStar.color)
            .setDescription(foundStar.description)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .addField("Source", `[Jump](${message.url})`)
            .setFooter(`${message.id}`)
            if (message.attachments.size > 0) {
                embed.setImage(image)
                }
          await stars.edit({ content: `🌟** ${star} **<#${message.channel.id}>`, embeds: [embed] });
        }
        if (!stars) {
            if (message.attachments.size > 0) {
                 image = message.attachments.first().url;
                }
          const embed = new MessageEmbed()
            .setColor("#f9df90")
            .setDescription(message.content)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTimestamp(new Date())
            .setFooter(`${message.id}`)
            .addField("Source", `[Jump](${message.url})`)

            if (message.attachments.size > 0) {
            embed.setImage(image)
            }
          await starChannel.send({ content: `🌟 ** 5 ** <#${message.channel.id}>`, embeds: [embed] });
        } 
    } 

}}