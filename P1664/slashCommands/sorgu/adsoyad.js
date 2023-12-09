const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "adsoyad", //the command name for the Slash Command
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
                name: "isim",
                description: "oyuncunun ismi",
                required: true,
            },
            
        },
        {
            "String":
            {
                name: "soyisim",
                description: "oyuncunun soyismi",
                required: true,
            },
            
        },
        {
            "String":
            {
                name: "il",
                description: "kişinin oturduğu il (listelemeyi azaltır)",
                required: false,
            },
            
        },
        
        //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
    ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
        try {
            var mysql = require('mysql');
            var con = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : '101m'
            });
           // interaction.reply({ content: "Yükleniyor...", ephemeral: true });
            var isim = interaction.options.getString("isim")
            var soyisim = interaction.options.getString("soyisim")
            var il = interaction.options.getString("il")

            //
            interaction.reply({ content: "Kişi DM Üzerinden Gönderildi.", ephemeral: true })


            //LOG SİSTEMİ
    
            if (il) {
                interaction.reply({ content: "Kişi Aranıyor.", ephemeral: true })
                con.query(`SELECT * FROM 101m WHERE ADI="${isim}" AND SOYADI="${soyisim}" AND NUFUSIL="${il}"`, function (err, result) {
                    if (err) throw err;
                    let data = JSON.parse(JSON.stringify(result))
                    if(data.length < 1) return interaction.user.send({ content: "Görünüşe göre bir sonuç bulunamadı bunun sebebi aşağıdaki maddelerden biri olabilir. \n ・ Sorguladığınız numara yeni ise sistemimize kayıtlı olmayabilir \n ・ Numarayı yanlış girmiş olabilirsin numaranın başında 0 olmamalı ve sayılar birleşik olmalıdır", ephemeral: true })


              let as31 = data.map((o) => `TCSİ: ${o.TC} | ADI: ${o.ADI} | SOYADI: ${o.SOYADI} | DOGUMTARİHİ: ${o.DOGUMTARIHI} | İL: ${o.NUFUSIL} | İLÇE: ${o.NUFUSILCE} | ANNE ADI: ${o.ANNEADI} | ANNE TC: ${o.ANNETC} | BABA ADI: ${o.BABAADI} | BABA TC: ${o.BABATC} | UYRUK: ${o.UYRUK}`).join('\n')
                  //  interaction.channel.send(`:tada: ${isim} ${soyisim} isminde **${data.length}** kişi bulundu.`)
                    let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `nefer.txt`);
                    interaction.user.send({ 
                        content: `:tada: ${isim} ${soyisim} isminde **${data.length}** kişi bulundu.`, 
                        files: [ dosyahazırla ]
                    })
                    interaction.reply({ content: "Dm üzerinden yolladım :white_check_mark:", ephemeral: false })
                })  
                } else { 
                  con.query(`SELECT * FROM 101m WHERE ADI="${isim}" AND SOYADI="${soyisim}"`, function (err, result) {
                    interaction.reply({ content: "Kişi Aranıyor.", ephemeral: true })
                    if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              if(data.length < 1) return interaction.user.send({ content: "Görünüşe göre bir sonuç bulunamadı bunun sebebi aşağıdaki maddelerden biri olabilir. \n ・ Sorguladığınız numara yeni ise sistemimize kayıtlı olmayabilir \n ・ Numarayı yanlış girmiş olabilirsin numaranın başında 0 olmamalı ve sayılar birleşik olmalıdır", ephemeral: true })


              let as31 = data.map((o) => `TCSİ: ${o.TC} | ADI: ${o.ADI} | SOYADI: ${o.SOYADI} | DOGUMTARİHİ: ${o.DOGUMTARIHI} | İL: ${o.NUFUSIL} | İLÇE: ${o.NUFUSILCE} | ANNE ADI: ${o.ANNEADI} | ANNE TC: ${o.ANNETC} | BABA ADI: ${o.BABAADI} | BABA TC: ${o.BABATC} | UYRUK: ${o.UYRUK}`).join('\n')
                   // interaction.channel.send(`:tada: ${isim} ${soyisim} isminde **${data.length}** kişi bulundu.`)
                    let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `nefer.txt`);
             // interaction.channel.send({ files: [ dosyahazırla ] })
             interaction.user.send({ 
                content: `:tada: ${isim} ${soyisim} isminde **${data.length}** kişi bulundu.`, 
                files: [ dosyahazırla ]
            })
            interaction.reply({ content: "Dm üzerinden yolladım :white_check_mark:", ephemeral: false })
           
                  }); 
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}