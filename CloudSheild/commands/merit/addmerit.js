const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addmerit')
		.setDescription('give a merit to a user')
        .addUserOption(option => option.setName('user').setDescription('give the merit to')),
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


const user = interaction.options.getUser('user');



if(!member.permissions.has("ADMINISTRATOR")) return interaction.reply({
    embeds: [new MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setDescription(`<:mcross:927673169706369045> You are missing the following permission:\n\`\`\`\nADMINISTRATOR\n\`\`\``)
         .setColor(15095896)
        
        
    ],
    
});


if (user.id === member.id) return interaction.reply({
    embeds: [new MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setDescription(`You can not give a merit to yourself!`)
        .setTitle("<:mcross:927673169706369045> Error")
        .setColor("#ee5050")
        
    ],
    
});


let userInDB = await userSchema.findOne({ userID: user.id });

        if (!userInDB) {

        const userDB = new userSchema({
            userID: user.id,
          });
          await userDB.save().catch((e) => {
            console.log(e);
          });

          userInDB = await userSchema.findOne({ userID: user.id });
        }


		const totalMerits = userInDB.merits

        const updatedMerits = totalMerits + 1


        userInDB.merits = updatedMerits;

        await userInDB.save().catch((e) => {
            console.log(e);
          });




          let s = " "

if (updatedMerits > 1) {
    s = "s"
}




interaction.reply({ embeds: [new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL())
    .setTitle("Merit gave")
    .setDescription(`<:merits:929733805793738772> 1 merit added to ${user.username}!\n\nThey now have <:merits:929733805793738772> ${updatedMerits} merit${s}`)
    .setColor("#7de0a3")
    
],

});

user.send({ embeds: [new MessageEmbed()
.setAuthor(member.guild.name, member.guild.iconURL())
.setTitle(`**You have been given a merit!**`)
.setColor("#2f3136")
.setDescription(`From ${member.user.username}\n\nYou now have <:merits:929733805793738772> ${updatedMerits} merit${s}`)

],
}).catch(error => {

})


    }
}