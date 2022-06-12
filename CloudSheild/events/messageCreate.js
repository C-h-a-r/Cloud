const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'messageCreate',
	async execute(message, client) {

		if (!message.guild || message.author.bot) return;

        const guildSchema = require("../../models/guild");


        let guildInDB = await guildSchema.findOne({ guildID: message.guild.id });

        if (guildInDB) {
            let bannedWords = guildInDB.bannedWords;

            if (bannedWords.indexOf(message.content) != -1){
                message.delete();
                

                message.channel.send({
                    embeds: [new MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`${message.author.username}, please refrain from using slurs`)
                        .setColor("#ee5050")
                        
                    ],
                });


           }
        }
    }
}
