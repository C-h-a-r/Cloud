module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		if (!interaction.guild || interaction.user.bot) return;

		

		if (interaction.isCommand()) {

			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction, interaction.client);
			} catch (error) {
				console.log(`${error}`);
				await interaction.reply(
					{
						content: 'There was an error executing this command.',
						ephemeral: true
					}
				);
			}
		}
    }
}
