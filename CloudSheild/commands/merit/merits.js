const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('merits')
		.setDescription('check merits')
        .addUserOption(option => option.setName('user').setDescription('check their merits')),
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
if (userInDB.merits > 1) {
    s = "s"
}
         
const embed = new MessageEmbed()
.setAuthor(member.user.username, member.user.displayAvatarURL())
.setTitle(`**${u.username || u.user.username} has <:merits:929733805793738772> ${userInDB.merits} merit${s}**`)
.setColor("#2f3136")



          interaction.reply({ embeds: [embed],
            
        });


	}
};