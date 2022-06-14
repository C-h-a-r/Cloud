const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearwarns')
		.setDescription('clear a users warnings')
        .addUserOption(option => option.setName('user').setDescription('user to clear warnings from').setRequired(true)),
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


        if(!member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
            embeds: [new MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setDescription(`<:mcross:927673169706369045> You are missing the following permission:\n\`\`\`\nMANAGE_MESSAGES\n\`\`\``)
                 .setColor(15095896)
            ],
            
        });
            //execute
            


        const user = interaction.options.getUser('user');

   
        if (user.id === member.id) return interaction.reply({
            embeds: [new MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setDescription(`You can not clear your own warnings!`)
                .setTitle("<:mcross:927673169706369045> Error")
                .setColor("#ee5050")
            ],
            
        });

        let userInDB = await userSchema.findOne({ userID: user.id });

       if (!userInDB) return interaction.reply({
        embeds: [new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setTitle(`<:mcross:927673169706369045> **${user.username} has no warnings!**`)
            .setColor("#ee5050")
        ],
        
    });

	

        

        userInDB.warns = 0
        userInDB.warnReasons = []

        await userInDB.save().catch((e) => {
            console.log(e);
          });


   
          
          
          
         


                
     

          interaction.reply({ embeds: [new MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setTitle(`**Removed all warnings from ${user.username}**`)
                .setColor("#7de0a3")
                .setTimestamp()
            ],
            
        });



        user.send({ embeds: [new MessageEmbed()
            .setAuthor(member.guild.name, member.guild.iconURL())
            .setTitle(`**Your warnings have been cleared!**`)
            .setColor("#2f3136")
            .setDescription(`Moderator: ${member.user.username}`)
        ],
    }).catch(error => {
        console.log(error)
    })

	}
};