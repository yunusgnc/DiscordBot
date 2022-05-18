const { channel } = require("diagnostics_channel");
const Discord = require("discord.js");
var weather = require("weather-js");
const file = "words.txt";
const fs = require("fs");
const { time } = require("console");
const TOKEN = "OTQ4MzI5NTE4NzYwODY5ODg5.Yh6OsA.1xjQwrfdA2Or4FRDbmPHLQVH61s";
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: allIntents });
var stringSimilarity = require("string-similarity");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var mybox = [];

//Kullanıcı Katıldığında
client.on("guildMemberAdd", (member) => {
  client.channels.fetch("948333295136047156").then((channel) => {
    var channel = channel;
    channel.send(`Merhaba  ${member.user.tag} kanalimiza hoş geldiniz !`);
  });
});

client.on("message", (msg) => {

  
var arr = ["Bu gün günlerden ne kadar iyi günler geçti?", "İyi günler"];

var similarity = stringSimilarity.compareTwoStrings(msg.content.toString(), arr[1]);

if(similarity > 0.3) {
  msg.channel.send("iyi günler geçti");
}


  ReadBadwordsFile(mybox);
  //Küfür kullananları uyarma.
  mybox.forEach((item) => {
    if (msg.content.toLocaleLowerCase() == item.toLocaleLowerCase()) {
      msg.channel.send(msg.author.username + ", Rica ediyorum küfür etme.");
    }
  });

  //İlk mesaj için kullanıcı yönlendirme.
  let firstMsg = "mrb,selam,merhaba,slm,günaydın,iyi akşamalar";
  var word = firstMsg.split(",");
  word.forEach((item) => {
    if (msg.content.toLocaleLowerCase() === item) {
      msg.channel.send(
        msg.author.username +
          " , Merhaba ne tür konuda yardım istiyordunuz ? yardım için '!help' menüsünden yardım alıabilirsiniz."
      );
    }
  });

  //Profil resmi gösterme.
  if (msg.content == "resim") {
    msg.reply(msg.author.displayAvatarURL());
  }

  //Bot yardım özlellikleri
  if (msg.content == "!help") {
    helpForUser(msg.channel);
  }

  //Bot yardım özlellikleri
  if (msg.content == "!sss") {
    sSSForUser(msg.channel);
  }

  //Sıkça Sorulan Sorular
  readJsonFile(msg);

  //Hava Durumu.
  if (msg.content == "hava?") {
    weather.find(
      { search: "Iğdır, TR", degreeType: "F" },
      function (err, result) {
        if (err) console.log(err);
        result.map((item) => {
          msg.channel.send(
            item.current.observationpoint + "-" + item.current.skytext
          );
        });
      }
    );
  }
});

// Küfürlü kelime dosyasını okuma.
function ReadBadwordsFile(mybox) {
  let badwords;
  try {
    badwords = fs.readFileSync(file, "utf8");
    badwords.split(",").forEach((item) => {
      mybox.push(item);
    });
  } catch (err) {
    console.error(err);
  }
}

function readJsonFile(msg) {
  const jsonData = require("./sss.json");
  jsonData.sss.forEach((item) => {
    if (msg.content == "sss1") {
      msg.channel.send(item.sss1);
    }
    if (msg.content == "sss2") {
      msg.channel.send(item.sss2);
    }

    if (msg.content == "sss3") {
      msg.channel.send(item.sss3);
    }
    if (msg.content == "sss4") {
      msg.channel.send(item.sss4);
    }
    if (msg.content == "sss5") {
      msg.channel.send(item.sss5);
    }
    if (msg.content == "sss6") {
      msg.channel.send(item.sss6);
    }
    if (msg.content == "sss7") {
      msg.channel.send(item.sss7);
    }
    if (msg.content == "sss8") {
      msg.channel.send(item.sss8);
    }
  });
}

// //help menu ;
function helpForUser(channel) {
  const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Commands : ")
    .addFields(
      { name: "Hava durumu : ", value: "hava?" },
      { name: "Profil resimi için :", value: "resim" },
      { name: "Sıkça Sorulan Sorular :", value: "!sss" }
    )
    .setTimestamp()
    .setFooter({
      text: "Aubamyng_17 : ",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  channel.send({ embeds: [exampleEmbed] });
}

function sSSForUser(channel) {
  const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Başlıkların altıntaki mesajı yazarak sonuca ulaşabilirsiniz.")
    .addFields(
      {
        name: "Her yıl programlara yeni kayıt yaptıracak öğrencileri kim belirliyor?  ",
        value: "sss1",
      },
      { name: "Üniversitemize kayıt nasıl yapılır?", value: "sss2" },
      {
        name: "Üniversiteye yeni kaydımı süresi içinde yaptıramazsam ne olur?",
        value: "sss3",
      },
      {
        name: "Danışmanım kimdir? Nasıl öğrenebilirim? Görevi nedir? ",
        value: "sss4",
      },
      {
        name: "Yeni kayıt işlemlerini şahsen yapmak zorunda mıyım?",
        value: "sss5",
      },
      {
        name: "Yeni kayıtta, ÖSYS Kılavuzunda istenen belgelerden başka belge istenir mi?",
        value: "sss6",
      },
      {
        name: "Üniversiteye yeni kayıt yaptırdıktan sonra başka işlem yapmam gerekiyor mu?",
        value: "sss7",
      },
      { name: "7-Ders başlama tarihlerini nasıl öğrenebilirim?", value: "sss8" }
    )
    .setTimestamp()
    .setFooter({
      text: "Aubamyng_17 : ",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  channel.send({ embeds: [exampleEmbed] });
}

function sssİnfo() {
  if (msg.content == "sss1") {
    msg.channel.send(sss.sss1);
  }
  if (msg.content == "sss2") {
    msg.channel.send(sss.sss2);
  }

  if (msg.content == "sss3") {
    msg.channel.send(sss.sss3);
  }
  if (msg.content == "sss4") {
    msg.channel.send(sss.sss4);
  }
  if (msg.content == "sss5") {
    msg.channel.send(sss.sss5);
  }
  if (msg.content == "sss6") {
    msg.channel.send(sss.sss6);
  }
  if (msg.content == "sss7") {
    msg.channel.send(sss.sss7);
  }
  if (msg.content == "sss8") {
    msg.channel.send(sss.sss8);
  }
}

client.login(TOKEN);
