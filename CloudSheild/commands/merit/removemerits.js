const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removemerits')
		.setDescription('Remove merits from a user')
        .addUserOption(option => option.setName('user').setDescription('The user to remove the merits from').setRequired(true))
  .addIntegerOption(option => option.setName('amount').setDescription('The amount of merits to remove')),
	async execute(interaction, client) {
const a = interaction.options.getInteger('amount');

    let amt = 1
    if (a) {
      amt = a
    }
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
        .setDescription(`<:mcross:927673169706369045> You cannot remove merits from yourself.`)
        .setColor("#ee5050")
        
    ],
    
});

    if (amt > 500) return interaction.reply({ embeds: [new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL())
    .setDescription(`<:mcross:927673169706369045> You cannot remove more than **500** merits.`)
    .setColor("#ee5050")
    
],

});


     const usr = member.guild.members.cache.get(user.id)

     const mbr = member.guild.members.cache.get(member.id)
    
    if (usr.roles.highest.position >= mbr.roles.highest.position) return interaction.reply({
            embeds: [new MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setDescription(`<:mcross:927673169706369045> **${user.username}** has the same or a higher role than you.`)
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

        const updatedMerits = totalMerits - amt


        userInDB.merits = updatedMerits;

        await userInDB.save().catch((e) => {
            console.log(e);
          });




          let s = " "

if (updatedMerits > 1) {
    s = "s"
}

let s2 = ""
    if (amt > 1) {
      s2 = "s"
    }


interaction.reply({ embeds: [new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL())
    .setDescription(`<:mtick:927673211250962462> Successfully removed **${amt}** merit${s2}. **${user.username}** now has <:merit:944985559816867941> **${updatedMerits}** merit${s}.`)
    .setColor("#7de0a3")
    
],

});


user.send({ embeds: [new MessageEmbed()
.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`You have lost **${amt}** merit${s2}. You now have <:merits:929733805793738772> **${updatedMerits}** merit${s}.`)
.setColor("#2f3136")

],
}).catch(error => {

})


    }
}