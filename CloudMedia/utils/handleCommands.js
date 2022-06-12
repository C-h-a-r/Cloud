const fs = require('fs');
const config = require('../../config');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
	const clientId = config.clientid;
	
	client.handleCommands = async (commandFolders, path) => {
		client.commandArray = [];
		for (folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`${path}/${folder}`)
				.filter((file) => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: '9' }).setToken(config.media);

		(async () => {
			try {
				console.log('Refreshing / commands');

				await rest.put(Routes.applicationCommands(config.mediaID), {
					body: client.commandArray,
				});

				console.log('Refreshed / commands');
			} catch (error) {
				console.log(`${error}`);
			}
		})();
	};
};
