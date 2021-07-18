module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message.",
    async execute(message, args, Discord, client) {
        const channel = '855137219160178748';
        const liveRadio = message.guild.roles.cache.find(role => role.name === "Live Radio");
        const announcements = message.guild.roles.cache.find(role => role.name === "Announcements");
        const anghamiEnthusiast = message.guild.roles.cache.find(role => role.name === "Anghmai Enthusiast");

        const liveRadioEmoji = '📻';
        const announcementsEmoji = '📢';
        const anghamiEnthusiastEmoji = '🎵';

        let embed = new Discord.MessageEmbed()
            .setColor('#A700FB')
            .setTitle('Roles')
            .setDescription(`${anghamiEnthusiastEmoji}  React to verify yourself as an **Anghami Enthusiast**\n\n`
                + `${announcementsEmoji}  React to be notified about **announcements** related to this Discord in <#855134986344464405>\n\n`
                + `${liveRadioEmoji}  React to be notified for **Live Radios** in <#855129525338898432>`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(anghamiEnthusiastEmoji);
        messageEmbed.react(announcementsEmoji);
        messageEmbed.react(liveRadioEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === anghamiEnthusiastEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(anghamiEnthusiast);
                }
                if (reaction.emoji.name === announcementsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(announcements);
                }
                if (reaction.emoji.name === liveRadioEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(liveRadio);
                }

            } else {
                return;
            }

        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === anghamiEnthusiastEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(anghamiEnthusiast);
                }
                if (reaction.emoji.name === announcementsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(announcements);
                }
                if (reaction.emoji.name === liveRadioEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(liveRadio);
                }

            } else {
                return;
            }

        });
    }

}