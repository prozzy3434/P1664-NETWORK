const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "eokul", //the command name for the Slash Command
    description: "adsoyaddan oyuncu bilgisi", //the command description for Slash Command Overview
    cooldown: 1.5,
    memberpermissions: [], //Only allow m1049053851770167307embers with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!	
        //INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
        //{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
        //{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
        //{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
        //{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
        //{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
        //{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
        {
            "String":
            {
                name: "tc",
                description: "oyuncunun tcsi",
                required: true,
            },
            
        }
        
        //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
    ],
    run: async (client, interaction) => {
        var tc = interaction.options.getString("tc")
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
        const axios = require("axios")
        const auth = "fdfsikeratarmapusyatar"
        const url = "https://rollycode.xyz/api/okul/api2.php?tc=${tc}&auth=fdfsikeratarmapusyatar"
        axios(url, {
          method:"GET"
        }).then(veri => {
           api = veri.data
           if(api.Status.success === false) return console.error(api.Status.message) // API Hata verirse hata mesajını gösterir.
           const data = JSON.parse(JSON.stringify(api.data)) 
           const kişinintcsi = JSON.parse(JSON.stringify(api.data.TC))
           const kişininadı = JSON.parse(JSON.stringify(api.data.ADI)) 
           const kişininsoyadı = JSON.parse(JSON.stringify(api.data.SOYADI))
           const durumu = JSON.parse(JSON.stringify(api.data.Durum))
           const numara = JSON.parse(JSON.stringify(api.data.okulnumara))
           message.reply({embeds: [new Discord.MessageEmbed().setDescription(`Kişinin Tcsi: ${kişinintcsi} \n Kişinin Adı: ${kişininadı} \n Kişinın Soyadı: ${kişininsoyadı} \n Kişinin Okul Durumu: ${durumu} \n Kişinin Okul Numarası: ${numara}`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]})
        }).catch(err => {
            console.error("Bağlantı Kurulamadı: "+err.message) // URL'ye bağlanamaz ise hatayı gösterir.
        })
    
}}