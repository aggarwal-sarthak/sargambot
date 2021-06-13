const client = require('../index.js')
const config = require('../config.json')

client.on('message', async message => {
    client.prefix = config.prefix

    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0 || !cmd) return;
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    try {
        command.run(client, message, args)
    }
    catch (error) {
        client.channels.cache.get('767037578855055360').send(`${client.emotes.failed} | ERROR IN ${cmd} \n${error}`);
    }
})