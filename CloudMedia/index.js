function media(){
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const mongoose = require("mongoose");

const userSchema = require("../models/user");
const config = require('../config');


mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const client = new Client({
    intents: 14023 
});

client.commands = new Collection();



const utils = fs.readdirSync('./CloudMedia/utils').filter(file => file.endsWith('.js'));

const eventsFiles = fs.readdirSync('./CloudMedia/events').filter(file => file.endsWith('.js'));

const commandFolders = fs.readdirSync('./CloudMedia/commands');



(async () => {
    for (file of utils) {
        require(`./utils/${file}`)(client);
    }

  
    client.handleEvents(eventsFiles, './CloudMedia/events');
    client.handleCommands(commandFolders, './CloudMedia/commands');

  
    client.login(config.media);
})();
}
module.exports = media;
