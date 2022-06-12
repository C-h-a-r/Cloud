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

        if (!userInDB) {

        const userDB = new userSchema({
            userID: u.id,
          });
          await userDB.save().catch((e) => {
            console.log(e);
          });

          userInDB = await userSchema.findOne({ userID: u.id });
        }

let s = " "
if (userInDB.warns > 1) {
    s = "s"
}
         
const embed = new MessageEmbed()
.setAuthor(member.user.username, member.user.displayAvatarURL())
.setTitle(`**${u.username || u.user.username} has ${userInDB.warns} warning${s}**`)
.setColor("#2f3136")





const e = userInDB.warnReasons.map(        
    (w, i) => `\n\`${i + 1}\` - ${w}`
)

embed.setDescription(`${e}`)

          interaction.reply({ embeds: [embed],
            
        });


	}
};