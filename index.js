const Discord = require('discord.js')
require('dotenv-flow').config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    mongoPath: process.env.MONGOPATH
}
const command = require('./command')

const { prefix } = require('./config.json')
const fs = require('fs')


// to acces the commands folder
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
// ends here


client.on('ready', () => { //to log if the bot is online
    console.log('Besties Handler is now online')

    command(client, ['ping', 'test'], (message) => { //bot test
        message.channel.send("Bestie's here")
    })
    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members!`
            )
        })

    })

    // displays the avatar of a user  //not working !!
    client.on('message', message => {
        if (message.content === 'avatar') {
            message.reply(message.author.displayAvatarURL());
        }
    });


    command(client, ['cc', 'clearchannel', 'clean'], (message) => {
        if (message.member.hasPermission('Administrator')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', (message) => {
        const content = message.content.replace('!help ', '')
        // "!status hello world" -> "hello world"

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})







client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    }

});



client.login(config.token);