const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addbannedword')
		.setDescription('add a banned word to the filter')
        .addStringOption(option => option.setName('word').setDescription('the word to ban')),
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

        const guildSchema = require("../../../models/guild");


const word = interaction.options.getString('word');



if(!member.permissions.has("ADMINISTRATOR")) return interaction.reply({
    embeds: [new MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setDescription(`<:mcross:927673169706369045> You are missing the following permission:\n\`\`\`\nADMINISTRATOR\n\`\`\``)
         .setColor(15095896)
    ],
    
});


let guildInDB = await guildSchema.findOne({ guildID: member.guild.id });

        if (!guildInDB) {

        const guildDB = new guildSchema({
            guildID: member.guild.id,
          });
          await guildDB.save().catch((e) => {
            console.log(e);
          });

          guildInDB = await guildSchema.findOne({ guildID: member.guild.id });
        }


		let wordArr = guildInDB.bannedWords;

if (wordArr.includes(word)) return interaction.reply({
    embeds: [new MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setDescription(`${word} is already a banned word!`)
        .setTitle("<:mcross:927673169706369045> Error")
        .setColor("#ee5050")
    ],
    
});




        wordArr.push(word)

        guildInDB.bannedWords = wordArr;

        await guildInDB.save().catch((e) => {
            console.log(e);
          });



          interaction.reply({ embeds: [new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setTitle("Word added")
            .setDescription(`${word} has been added to the banned filter!`)
            .setColor("#7de0a3")
        ],
        
    });

    }
}