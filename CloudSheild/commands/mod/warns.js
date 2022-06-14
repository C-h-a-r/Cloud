const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warns')
		.setDescription('check warnings')
        .addUserOption(option => option.setName('user').setDescription('check their warns')),
	async execute(interaction, client) {

        const {
            member,
            channelId,
            guildId,
            applicationId,
            commandName,
            deferred,
            replied,
            ephemeral,
            options,
            id,
            createdTimestamp
        } = interaction;
        const {
            guild
        } = member;

        const userSchema = require("../../../models/user");


let u = member

const user = interaction.options.getUser('user');

if (user) {
    u = user;
}

        let userInDB = await userSchema.findOne({ userID: u.id });

const noWarns = new MessageEmbed()
.setAuthor(member.user.username, member.user.displayAvatarURL())
.setDescription(`**${u.username || u.user.username}** has no warns.`)
.setColor("#2f3136")
        
        if (!userInDB) {
            return interaction.reply({ embeds: [noWarns]})
        }

let s = " "
if (userInDB.warns > 1) {
    s = "s"
}

    let e = "" 

    if (userInDB.warns) {
 e = userInDB.warnReasons.map(        
    (w, i) => `\n\`${i + 1}\` - ${w}`
)
    } 

    const embed = new MessageEmbed()
.setAuthor(member.user.username, member.user.displayAvatarURL())

.setColor("#2f3136")

    
    if (!userInDB.warns) {
        embed.setDescription(`**${u.username || u.user.username}** has no warns`) 

    } else {
      embed.addField(`${u.username || u.user.username} has ${userInDB.warns} warn${s}`, `${e}`)
    }

    


          interaction.reply({ embeds: [embed],
            
        });


	}
};