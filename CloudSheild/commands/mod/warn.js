const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('warn a user')
        .addUserOption(option => option.setName('user').setDescription('user to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason for warning')),
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
           
            


        const user = interaction.options.getUser('user');

        const reason = interaction.options.getString('reason');

        let r = `Moderator: ${member.user.username}, Reason: No Reason Provided`

        if (reason) {
            r = `Moderator: ${member.user.username}, Reason: ` + reason + ""
        }


        
       if (user.id === member.id) return interaction.reply({
            embeds: [new MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setDescription(`You can not warn yourself!`)
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


		const totalWarns = userInDB.warns
        let reasonsArray = userInDB.warnReasons

        let rA = reasonsArray.push(r)

        const warnsUpdated = totalWarns + 1

        userInDB.warns = warnsUpdated
        userInDB.warnReasons = reasonsArray

        await userInDB.save().catch((e) => {
            console.log(e);
          });


   
          
          
          
         

let s = " "

if (warnsUpdated > 1) {
    s = "s"
}
                      


if (3 <= warnsUpdated) {
    let muteRole = member.guild.roles.cache.find(role => role.name === "Muted");

  const usr = member.guild.members.cache.get(user.id)

   usr.roles.add(muteRole)

   const e = userInDB.warnReasons.map(        
    (w, i) => `\n\`${i + 1}\` - ${w}`
)

   user.send({ embeds: [new MessageEmbed()
    .setAuthor(member.guild.name, member.guild.iconURL())
    .setColor(3092790)
    .setDescription(`You have been muted for 3 hours, because you have reached <:cc_warn:985585021664497774> 3 or more warns.`)
    .addField(`Warns`, `${e}`, true)
    
],
})



   setTimeout(function(){
    usr.roles.remove(muteRole)

    user.send({ embeds: [new MessageEmbed()
        .setAuthor(member.guild.name, member.guild.iconURL())
        .setTitle(`**You have been unmuted!**`)
        .setColor(3092790)
        .setDescription(`Your tempmute has ended!`)
        
    ],
    })

}, 10800000);
    
}
     

          interaction.reply({ embeds: [new MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setDescription(`<:mtick:927673211250962462> Successfully warned **${user.username}.**`)
                .addField(`Reason`, `${reason || "No Reason Specified"}`)
                .addField(`Warn${s}`, `${warnsUpdated}`)
                .setColor("#7de0a3")
                
            ],
            
        });

        user.send({ embeds: [new MessageEmbed()
            .setAuthor(member.guild.name, member.guild.iconURL())
            .setColor(3092790)
            .setDescription(`<:cc_warn:985585021664497774> You have been warned in ${member.guild.name}`)
            .setFooter("If you reach 3 warns, you will be muted for 3 hours")
            .addField("Reason", `${reason || "No Reason Specified"}`, true)
            .addField("Moderator", `${member.user.tag}`, true)
            .addField(`Warn${s}`, `${warnsUpdated}`, false)

            
        ],
    }).catch(error => {
       
    })




 

	}
};