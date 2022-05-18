const Discord = require("discord.js");
const client = new Discord.Client();
const getPrefix = require("./prefix.json")
const { Client, MessageEmbed,Util ,Permissions} = require("discord.js")
var prefix = getPrefix.prefix
const pkceChallenge = require("pkce-challenge");
const pkce = pkceChallenge();
const jikanjs = require('jikanjs');
const keepAlive = require("./server")
const disbut = require('discord-buttons')(client)
const { Player } = require("discord-player");
const paginationEmbed = require('discord.js-pagination');
const Pagination = require("discord-paginationembed");
const song = require("@allvaa/get-lyrics");
const Genius = require("genius-lyrics");
const GeniusClient = new Genius.Client("e14Y8qIlIP9ZoPoqaW0DkQqkK6u3Ub1P9ItjvsNWssAxqMFP8Q0R5vwvOitVHT1A");





const player = new Player(client,{ytdlDownloadOptions: {
        filter: "audioonly"
    },leaveOnEnd:false,leaveOnEmpty:false,enableLive: true,fetchBeforeQueued:false
});



client.player = player;


var q=" "
topinfo = {}

process.on('unhandledRejection', error => {
    console.log('Test error:', error);
});
client.player.on("trackStart", (message, track) => {
  embed=new Discord.MessageEmbed()
  .setTitle("Şimdi Çalıyor")
  .setDescription(`[${track.title}](${track.url}) - <@${track.requestedBy.id}>`)
  .setColor("RANDOM")
  .setFooter(`Uzunluk: ${track.duration}`)
  message.channel.send(embed)
  })
client.on("clickButton",async (button)=>{
  if (button.id=="id1"){
    button.defer()
    if (parseInt(button.message.content)>1){
      button.message.edit(parseInt(button.message.content)-1)
    }
    else{
      button.channel.send(`Sayı en az 1 olabilir ${button.clicker.user.tag}`)
    }

  }
  if (button.id=="id3"){
    button.defer()
    if (parseInt(button.message.content)>0){
      button.message.edit(parseInt(button.message.content)+1)

    }

  }
  if (button.id=="nasilim-evet"){
    button.defer()
    const evet = parseInt(button.message.content.split(" ").slice(1,2))
    const hayir =parseInt(button.message.content.split(" ").slice(4,5))
    const yenievet= evet+1
    button.message.edit(`Evet: ${yenievet} , Hayır: ${hayir}`)
  }
  if (button.id=="nasilim-hayir"){
    button.defer()
    const evet = parseInt(button.message.content.split(" ").slice(1,2))
    const hayir =parseInt(button.message.content.split(" ").slice(4,5))
    const yenihayir= hayir+1
    button.message.edit(`Evet: ${evet} , Hayır: ${yenihayir}`)

  }
})
client.on("message", message => {
  if (message.author.bot == true) {
    return
  }
  if (message.author == client.user) {
    return
  }
  else {
    if (message.content.startsWith(prefix+"jstest")){
      console.log(message.author)
      if (message.author.id== "484669487698804747"){
        message.channel.send("Java Script botu çalışıyor.")
      }
    }
    if (message.content.startsWith(prefix+"buttontest")){
      if (message.author.id== "484669487698804747"){
        let button= new disbut.MessageButton()
        .setStyle('green')
        .setLabel('<')
        .setID('id1')
        let blurple= new disbut.MessageButton()
        .setStyle('green')
        .setLabel('>')
        .setID('id3')
        message.channel.send("1",{buttons:[button,blurple]})
      }
    }
    if (message.content.startsWith(prefix+"nasilim")){
      if (message.author.id=="484669487698804747"){
        let evet= new disbut.MessageButton()
        .setStyle('green')
        .setLabel('Evet')
        .setID('nasilim-evet')
        let hayir= new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Hayır')
        .setID('nasilim-hayir')
        message.channel.send("Evet: 0 , Hayır: 0",{buttons:[evet,hayir]})
      }
    }
    if (message.content.startsWith(prefix + "searchanime ") || message.content.startsWith(prefix + "sa ")) {
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      jikanjs.search("anime", name, limit = 1).then((response) => {
        var isFirstResult = true
        response.results.forEach(element => {
          
          if (isFirstResult == true) {
            console.log(element)
            function getAir(element) {
              if (element.airing == false) {
                return "Hayır"
              }
              else {
                return "Evet"
              }
            }
            const embed = new Discord.MessageEmbed()
              .setTitle("'" + name + "' animesini aradım. En yakın sonuç:")
              .addField(element.title, element.url)
              .addField("Açıklama:", element.synopsis)
              .setImage(element.image_url)
              .setFooter("Bölüm sayısı:" + element.episodes + " | Puan:" + element.score + " | Yayımlanıyor mu?:" + getAir(element))
            message.channel.send(embed)
            isFirstResult = false
          }
        })
      }).catch((err) => {
        console.error(err);
      })
    }
    if (message.content.startsWith(prefix + "maluser ")) {
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      jikanjs.loadUser(name).then((response) => {
        console.log(response)
        function dateconvert(inp) {
          const year = inp.slice(0, 4)
          const month = inp.slice(5, 7)
          const day = inp.slice(8, 10)
          var monthsdict = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" }
          const convmonth = monthsdict[month]
          return day + " " + convmonth + " " + year
        }
        const userEmbed = new Discord.MessageEmbed()
          .setTitle(response.username + " kullanıcısının profili:")
          .setImage(response.image_url)
          .setDescription(response.url)
          .addFields(
            { name: 'Katılma Tarihi', value: dateconvert(response.joined) },
            { name: 'En Son Ne Zaman Aktifti:', value: dateconvert(response.last_online) },
          )
          .addField("Anime İstatistikleri (İzlediği Bölüm Sayısı:" + response.anime_stats.episodes_watched + ")", "Bitirdiği:" + response.anime_stats.completed + " | İzliyor:" + response.anime_stats.watching + " | İzleyecek:" + response.anime_stats.plan_to_watch + " | Beklemede:" + response.anime_stats.on_hold + " | Yarıda Bıraktıkları:" + response.anime_stats.dropped)
          .addField(`Manga İstatistikleri (Okuduğu Chapter Sayısı:${response.manga_stats.chapters_read})`, `Bitirdiği:${response.manga_stats.completed} | Okuyor:${response.manga_stats.reading} | Okuyacak: ${response.manga_stats.plan_to_read} | Beklemede:${response.manga_stats.on_hold} | Yarıda Bıraktıkları: ${response.manga_stats.dropped}`)
        message.channel.send(userEmbed)
      })
    }
    if (message.content.startsWith(prefix + "searchmanga ") || message.content.startsWith(prefix + "sm ")) {
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      jikanjs.search("manga", name).then((response) => {
        var isFirstResult = true
        response.results.forEach(element => {
          if (isFirstResult == true) {
            function getAir(element) {
              if (element.publishing == false) {
                return "Hayır"
              }
              else {
                return "Evet"
              }
            };
            const mangaEmbed = new Discord.MessageEmbed()
              .setTitle(`'${name}' mangasını aradım. En yakın sonuç:`)
              .addField(element.title, element.url)
              .addField("Açıklama:", element.synopsis)
              .setImage(element.image_url)
              .setFooter("Chapter sayısı:" + element.chapters + " | Puan:" + element.score + " | Yayımlanıyor mu?:" + getAir(element))
            message.channel.send(mangaEmbed)
            isFirstResult = false
          }
        })
      })
    }
    if (message.content.startsWith(prefix + "searchcharacter ") || message.content.startsWith(prefix + "sc ")) {
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      if (name == "şüqomatik") {
        console.log("ok")
      }
      else if (name == "roşna" || name == "rivale") {
        const rivembed = new Discord.MessageEmbed()
          .setTitle(name + " araması yaptım. En yakın sonuç:")
          .addField("Roşna", "Web Sitesi Bulunamadı.")
          .setImage("https://media.discordapp.net/attachments/734569820812738601/840985736203075624/unknown.png")
          .addField("Hangi Anime(ler)den:", "Gerçek Hayat(Ne yazık ki)")
          .setFooter("AKA Bahtsız Piyade")
        message.channel.send(rivembed)
      }
      else {
        jikanjs.search("character", name).then((response) => {
          var isFirstResult = true
          response.results.forEach(element => {
            if (isFirstResult == true) {
              var animes = []
              var mangas = []
              var inAnimes = "a"
              var inMangas = "a"
              for (anime in element.anime) {
                animes.push(element.anime[anime].name)
              }
              for (manga in element.manga) {
                mangas.push(element.manga[manga].name)
              }
              if (animes != []) {
                console.log("a")
                inAnimes = animes.join(",")
                if (inAnimes.length > 300) {
                  inAnimes = (inAnimes.slice(0, 300) + "**...**")
                }
              }
              if (animes == []) {
                inAnimes = "Animede yok."
              }
              if (mangas != []) {
                inMangas = mangas.join(",")
                if (inMangas.length > 300) {
                  inMangas = (inMangas.slice(0, 300) + "**...**")
                }
              }
              if (mangas == []) {
                inMangas = "Mangada yok."
              }
              const characterEmbed = new Discord.MessageEmbed()
                .setTitle(`'${name}' karakterini aradım. En yakın sonuç:`)
                .addField(element.name, element.url)
                .setImage(element.image_url)
                .addField("Hangi Anime(ler)den:", inAnimes)
                .addField("Hangi Manga(lar)dan:", inMangas)
                .setFooter("AKA " + element.alternative_names)
              console.log(element)
              message.channel.send(characterEmbed)
              isFirstResult = false
            }
          })
        })
      }
    }
    if (message.content.startsWith(prefix + "searchperson ") || message.content.startsWith(prefix + "sp ")) {
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      jikanjs.search("person", name).then((response) => {
        var isFirstResult = true
        response.results.forEach(element => {
          if (isFirstResult) {
            jikanjs.loadPerson(element.mal_id).then((response) => {
              var about = " "
              if (response.about.length > 300) {
                about = response.about.slice(0, 300) + "**...**"
              }
              else {
                about = response.about
              }
              const personembed = new Discord.MessageEmbed()
                .setTitle("'" + name + "' Araması Yaptım. En Yakın Sonuç:")
                .addField(response.name + " ", response.url)
                .setImage(response.image_url)
                .addField("Hakkında Bilgiler:", about)
              message.channel.send(personembed)
              console.log(response)
            })
            isFirstResult = false
          }

        })
      }).catch((error) => {
        message.channel.send(error)
      })

    }
    if (message.content.startsWith(prefix + "top")) {
      if (message.content.includes("topic")) {
        return
      }
      else {
        var allInfo = message.content.split(" ").slice(1)
        gen = []
        num = 10
        for (x in allInfo) {
          if (Number.isNaN(parseInt(allInfo[x]))) {
            gen.push(allInfo[x])
          }
          else {
            num = allInfo[x]
          }
        }
        genre = gen.join(" ")
        genre= genre.toLowerCase() 
        console.log("num:" + num)
        console.log("genre:" + genre)
        if (genre == "") {

          jikanjs.loadTop("anime", page = 1).then((response) => {

            response.top.forEach(element => {
              theTitle = element.rank + ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed = new Discord.MessageEmbed().setTitle('En Çok Beğenilen ' + num + " anime")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField(anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}
          }).catch((error) => {
            console.log(error)
          })
        }//end of general
        if (genre=="shonen"||genre=="shounen"){
          jikanjs.loadGenre("anime",27,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" shounen animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }//end of shonen
        if (genre=="action"||genre=="aksiyon"){
          jikanjs.loadGenre("anime",1,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" aksiyon animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="adventure"||genre=="macera"){
          jikanjs.loadGenre("anime",2,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" macera animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="cars"||genre=="araba"||genre=="racing"||genre=="yarış"){
          jikanjs.loadGenre("anime",3,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" yarış animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="comedy"||genre=="komedi"){
          jikanjs.loadGenre("anime",4,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" komedi animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="dementia"||genre=="kişilik bölünmesi"){
          jikanjs.loadGenre("anime",5,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" kişilik bölünmesi animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="demons"||genre=="şeytan"){
          jikanjs.loadGenre("anime",6,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" şeytan animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="mystery"||genre=="gizem"){
          jikanjs.loadGenre("anime",7,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" gizem animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="drama"||genre=="dram"){
          jikanjs.loadGenre("anime",8,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" dram animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="ecchi"){
          jikanjs.loadGenre("anime",9,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" ecchi animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="fantasy"||genre=="fantezi"){
          jikanjs.loadGenre("anime",10,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" fantezi animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="game"||genre=="oyun"){
          jikanjs.loadGenre("anime",11,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" oyun animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="historical"||genre=="tarihi"){
          jikanjs.loadGenre("anime",13,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" tarih animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="horror"||genre=="korku"){
          jikanjs.loadGenre("anime",14,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" korku animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="kids"||genre=="çocuk"){
          jikanjs.loadGenre("anime",15,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" çocuk animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="magic"||genre=="sihir"||genre=="büyü"){
          jikanjs.loadGenre("anime",16,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" büyü animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="martial arts"||genre=="dövüş sanatı"||genre=="dövüş sanatları"||genre=="martial art"){
          jikanjs.loadGenre("anime",17,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" dövüş sanatı animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="mecha"){
          jikanjs.loadGenre("anime",18,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" mecha animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="music"||genre=="müzik"){
          jikanjs.loadGenre("anime",19,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" müzik animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="parody"||genre=="parodi"){
          jikanjs.loadGenre("anime",20,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" parodi animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="samurai"||genre=="samuray"){
          jikanjs.loadGenre("anime",21,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" samuray animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="romance"||genre=="romantik"||genre=="romans"){
          jikanjs.loadGenre("anime",22,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" romans animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="school"||genre=="okul"){
          jikanjs.loadGenre("anime",23,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" okul animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="sci-fi"||genre=="sci fi"||genre=="scifi"||genre=="bilim kurgu"){
          jikanjs.loadGenre("anime",24,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" bilim kurgu animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="shoujo"){
          jikanjs.loadGenre("anime",25,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" shoujo animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="shoujo ai"){
          jikanjs.loadGenre("anime",26,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" shoujo ai animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="shounen ai"||genre=="shonen ai"){
          jikanjs.loadGenre("anime",28,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" shounen ai animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="space"||genre=="uzay"){
          jikanjs.loadGenre("anime",29,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" uzay animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="sports"||genre=="spor"){
          jikanjs.loadGenre("anime",30,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" spor animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="super power"||genre=="süper güç"){
          jikanjs.loadGenre("anime",31,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" süper güç animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="vampire"||genre=="vampir"){
          jikanjs.loadGenre("anime",32,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" vampir animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="yaoi"){
          jikanjs.loadGenre("anime",33,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" yaoi animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="yuri"){
          jikanjs.loadGenre("anime",34,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" yuri animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="harem"){
          jikanjs.loadGenre("anime",35,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" harem animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="slice of life"||genre=="hayattan kesit"){
          jikanjs.loadGenre("anime",36,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" slice of life animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="supernatural"||genre=="doğaüstü"||genre=="doğa üstü"||genre=="super natural"){
          jikanjs.loadGenre("anime",37,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" doğaüstü anime")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="military"||genre=="askeri"){
          jikanjs.loadGenre("anime",38,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" askeri anime")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="police"||genre=="polis"){
          jikanjs.loadGenre("anime",39,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" polis animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="psychological"||genre=="psikolojik"||genre=="psiko"){
          jikanjs.loadGenre("anime",40,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" psikolojik anime")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="thriller"||genre=="gerilim"){
          jikanjs.loadGenre("anime",41,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" gerilim animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="seinen"){
          jikanjs.loadGenre("anime",42,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" seinen animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="josei"){
          jikanjs.loadGenre("anime",43,page=1).then((response)=>{
            response.anime.forEach(element=>{
              theTitle = ". " + element.title
              theUrl = element.url
              topinfo[theTitle] = theUrl
            })
            const topEmbed= new Discord.MessageEmbed().setTitle('Beğenilen '+num+" josei animesi")
            .setColor("RANDOM")
            counter = 0
            for (anime in topinfo) {
              if (counter != num) {
                topEmbed.addField((counter+1)+anime, topinfo[anime])
                counter += 1
              }
              else {
                break
              }
            }
            message.channel.send(topEmbed)
            topinfo={}

          }).catch((error)=>{
            console.log(error)
          })
        }
        if (genre=="help"||genre=="genres"||genre=="türler"){
          const topHelpEmbed= new Discord.MessageEmbed().setTitle(",top komutuyla aşağıdaki türlerden herhangi birinin en çok beğenilen animelerini ,top <tür> <sayı> şeklinde bulabilirsiniz.(<sayı> eklemek mecburi değildir, eklemezseniz otomatikmen 10 tane anime gösterilir.Max=25)")
          .setDescription("**Mevcut Türler:**Aksiyon,Macera,Yarış,Komedi,Kişilik Bölünmesi,Şeytan,Gizem,Dram,Ecchi,Fantezi,Oyun,Tarihi,Korku,Çocuk,Büyü,Dövüş Sanatları,Mecha,Müzik,Parodi,Samuray,Romans,Okul,Bilim Kurgu,Shoujo,Shoujo ai, Shonen,Shonen ai,Uzay,Spor,Süper Güç,Vampir,Yaoi,Yuri,Harem,Slice of life,Doğaüstü,Askeri,Polis,Psikolojik,Gerilim,Seinen,Josei")
          message.channel.send(topHelpEmbed)
        }
      }//inside top command
    }//end of top command

  }
   
  if ((message.content.split(" ").slice(0,1)==",play")||(message.content.split(" ").slice(0,1)==",p")){
    var a = " "
    try{
      a=client.channels.cache.get(`${message.member.voice.channel.id}`)

    }
    catch (err){
      console.log(err)
    }
    try{
      a.join()
    }
    catch (err){
      console.log(err)

    }
    var nameraw = message.content.split(" ").slice(1)
    var name = nameraw.join(" ")
    if (name.toLowerCase().includes("open.spotify.com/user/")){
      var list= message.content.split("/")
      pid= list.slice(-1)
      console.log(pid)
      name= `https://open.spotify.com/playlist/${pid}`
    }

    console.log(name)
    client.player.play(message, name,true).then(song=>{

      
    }).catch(e=>{
      console.error(e)
    })

    

  }
  x=" "
  if (((message.content.startsWith(",queue") )||(message.content.split(" ").slice(0,1)==",q"))){
    if (!message.member.voice.channel) return message.channel.send(`Seslide değilsin :ı`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı seslide olmalısın :ı`);

    if (!client.player.getQueue(message)) return message.channel.send(`Queue boş.`);
    const queue = client.player.getQueue(message);
    a={}
    num=0
    queue.tracks.map(track=>{
      a[track]=num
      num+=1
    })
    let i = 0;

    const FieldsEmbed = new Pagination.FieldsEmbed();

    FieldsEmbed.embed
    .setColor("RANDOM")
    .setAuthor("Şarkı Listesi", message.guild.iconURL({ dynamic: true }))
    .addField("Şimdi Çalan:", `[${queue.tracks[0].title}](${queue.tracks[0].url})\n${queue.tracks[0].requestedBy} - \`${queue.tracks[0].duration}\`\n`);
    if (queue.tracks.length<=1){
      message.channel.send(embed)
    }
    else{
    FieldsEmbed.setArray(queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : [])
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(5)
    .setPageIndicator(true)
    .formatField("Queue", (track) => `${a[track]}. [${track.title}](${track.url})\n*${track.requestedBy}* - \`${track.duration}\`\n`);
    FieldsEmbed.build();

    }
    
 
    

    

    
    
  }
  if (message.content.startsWith(",np")||(message.content.split(" ").slice(0,1)==",nowplaying")){
  if (!message.member.voice.channel) return message.channel.send(`Seslide değilsiniz !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı seslide değilsiniz !`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik çalmıyor !`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RANDOM',
                author: { name: track.title },
                footer: { text: 'Developed by Krios',icon_url:"https://images-ext-2.discordapp.net/external/kkMwKH9Wqbw-3yvOxKAKUxk6tiGkI9G8RE08e0e3gsQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/484669487698804747/f9e87192b21bad5dce510c10b419a79c.webp",url: "https://discord.com"},
                fields: [
                    { name: 'Kanal:', value: track.author, inline: true },
                    { name: 'İsteyen:', value: track.requestedBy.username, inline: true },
                    { name: 'Şarkı linki:', value:`[${track.title}](${track.url})`, inline: true },
                    { name: 'Çalma listesinden mi:', value: track.fromPlaylist ? 'Evet' : 'Hayır', inline: true },

                    { name: 'Görüntülenme sayısı:', value: track.views, inline: true },
                    { name: 'Uzunluk:', value: track.duration, inline: true },
                    

                    { name: 'Ses yüksekliği:', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Tekrar modu', value: client.player.getQueue(message).repeatMode ? 'Evet' : 'Hayır', inline: true },
                    { name: 'Durdurulmuş:', value: client.player.getQueue(message).paused ? 'Evet' : 'Hayır', inline: true },

                    { name: 'İlerleme barı', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    }
    if ((message.content.split(" ").slice(0,1)==",skip")||(message.content.split(" ").slice(0,1)==",s")){
       if (!message.member.voice.channel) return message.channel.send(` Seslide değilsin !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı ses kanalında değilsin !`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik çalmıyor !`);
        try{
          client.player.skip(message);
          message.channel.send(`Çalan şarkı **geçildi** !`)

        }
        catch (err){
          message.channel.send(err)
        }
    }
    if (message.content.startsWith(",pause")||(message.content.split(" ").slice(0,1)==",ps")){
      if (!message.member.voice.channel) return message.channel.send(`Bu komutu kullanmak için seslide olmalısın !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Bu komutu kullanmak için botla aynı kanalda olmalısın!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Zaten müzik çalmıyor !`);

        if (client.player.getQueue(message).paused) return message.channel.send(`Müzik zaten durduruldu :ı`);

        const success = client.player.pause(message);


        if (success) {
          message.channel.send(` \`${client.player.getQueue(message).playing.title}\` **durduruldu.** ⏸️`);
          message.react("⏸️")
        }
    
    }
    if (message.content.startsWith(",resume")||(message.content.split(" ").slice(0,1)==",rs")){
      if (!message.member.voice.channel) return message.channel.send(`Seslide değilsin :ı`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı seslide olmalısın :ı`);

        if (!client.player.getQueue(message)) return message.channel.send(`Çalacak müzik yok`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`Müzik zaten çalıyor :ı`);

        const success = client.player.resume(message);
        

        if (success){ 
          message.channel.send(`\`${client.player.getQueue(message).playing.title}\` **devam ediyor...** ▶️`);
          message.react("▶️")
          }
    }
    if (message.content.startsWith(",join")||(message.content.split(" ").slice(0,1)==",j")){
      channel=" "
      try{
        channel=client.channels.cache.get(`${message.member.voice.channel.id}`)

      }
      catch (err){
      
        console.log(err)
      }
      
      try{
        channel.join()

      }
      catch(err){
        console.log(err)
      }
      
      message.react("<a:musicbeat:859573154950283264>")



      }
    if (message.content.startsWith(",leave")||(message.content.split(" ").slice(0,1)==",dc")){
      channel= " "
      try{
        channel=client.channels.cache.get(`${message.member.voice.channel.id}`)

      }
      catch (err){
      
        console.log(err)
      }
      
      
      
      try{
        
        channel.leave()

      }
      catch (err){
        console.log(err)
      }
      
      
      message.react("<a:bye:859717197991116800>")
    }
    if (message.content.startsWith(",volume")||(message.content.split(" ").slice(0,1)==",v")){
      const nameraw = message.content.split(" ").slice(1)
      if (!message.member.voice.channel) return message.channel.send(`Seslide değilsiniz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (!nameraw || isNaN(nameraw) || nameraw === 'Infinity') return message.channel.send(` Düzgün bir sayı girin !`);

        if (Math.round(parseInt(nameraw)) < 1 || Math.round(parseInt(nameraw)) > 100) return message.channel.send(`Girdiğiniz sayı 1 ve 100 arasında olmalı !`);

        const success = client.player.setVolume(message, parseInt(nameraw));

        if (success) message.channel.send(`Ses %**${parseInt(nameraw)}**e ayarlandı !`);
    }
    if (message.content.startsWith(",shuffle")||(message.content.split(" ").slice(0,1)==",sh")){
      if (!message.member.voice.channel) return message.channel.send(`Seslide değilsiniz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda liste boş!`);

        const success = client.player.shuffle(message);

        if (success) {
          message.channel.send(` **Liste karıştırıldı! 🔀**`);
          message.react("🔀")}
    }
    if (message.content.startsWith(",loop")||(message.content.split(" ").slice(0,1)==",lp")){
      var nameraw=" "
      try{
        nameraw = message.content.split(" ").slice(1)[0]

      }
      catch(err){
        console.log(err)
      }

      
      if (!message.member.voice.channel) return message.channel.send(`Seslide değilsiniz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda şarkı çalmıyor!`);

        if (nameraw === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`Döngü **devre dışı bırakıldı.** `);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(` Döngü **etkinleştirildi...** Döngü modu:Liste`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(` Döngü **devre dışı bırakıldı.** !`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(` Döngü **etkinleştirildi...** Döngü modu: Şarkı`);
            };
        };

    }
    if ((message.content.split(" ").slice(0,1)==",filter")||(message.content.split(" ").slice(0,1)==",f")){
      filters= ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding']
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      if (!message.member.voice.channel) return message.channel.send(`Seslide değilsiniz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` Botla aynı kanalda değilsiniz !`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik çalmıyor!`);

        if (!name) return message.channel.send(` Lütfen bir filtre belirtiniz !`);

        const filterToUpdate = filters.find((x) => x.toLowerCase() === name.toLowerCase());

        if (!filterToUpdate) return message.channel.send(` Bu filtre bulunamadı. Lütfen mevcut bir filtre yazınız(Örnek:8D, vibrato, pulsator...) !`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(` Filtre ekleniyor... Şarkının uzunluğuna göre bu işlem uzayabilir.`);
        else message.channel.send(` Filtre kaldırılıyor... Şarkının uzunluğuna göre bu işlem uzayabilir.`);

    }
    if ((message.content.split(" ").slice(0,1)==",skipto")||(message.content.split(" ").slice(0,1)==",st")){
      const argraw = message.content.split(" ").slice(1)
      const arg = argraw.join(" ")
      no= parseInt(arg)
      if (!message.member.voice.channel) return message.channel.send(` Seslide değilsiniz !`);

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz !`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik yok !`);
        try{
          client.player.jump(message,no)
          message.channel.send(`${no}. şarkıya geçildi.`)

        }
        catch (err){
          message.channel.send(err)
        }
      
      
    }
    if ((message.content.split(" ").slice(0,1)==",multiadd")||(message.content.split(" ").slice(0,1)==",ma")){
      if (!message.member.voice.channel) return message.channel.send(` Seslide değilsiniz !`);

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz !`);
      const nameraw = message.content.split(" ").slice(1)
      const name = nameraw.join(" ")
      const all= name.split("$")
      try{
      a=client.channels.cache.get(`${message.member.voice.channel.id}`)

      }
      catch (err){
        console.log(err)
      }
    
      a.join().then(connection => {


      }).catch(e => {

      console.error(e);
      });
      all.map(a=>{
        client.player.play(message, a,true).then(song=>{

      
      }).catch(e=>{
        console.error(e)
      })

      })

    }
    if ((message.content.split(" ").slice(0,1)==",seek")||(message.content.split(" ").slice(0,1)==",sk")){
      const nameraw = message.content.split(" ").slice(1)
      const t = nameraw.join(" ")
      const time=parseInt(t)*1000

      if (!message.member.voice.channel) return message.channel.send(` Seslide değilsiniz !`);

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz !`);

      if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik yok !`);
      const queue = client.player.getQueue(message);

      try{
        client.player.setPosition(message,time);
        const v= format(time/1000)
        message.channel.send(v+"'e atlandı.")


      }
      catch(err){
        console.log(err)
      }
      

    }
    if ((message.content.split(" ").slice(0,1)==",lyrics")||(message.content.split(" ").slice(0,1)==",l")){
      if (!message.member.voice.channel) return message.channel.send(` Seslide değilsiniz !`);

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz !`);

      if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik yok !`);


      const queue=client.player.getQueue(message)
      var fs= queue.tracks[0].title
      removelist=["Official","Video","Lyrics","Audio","(",")","[Magic Free Release]","Lyric","Explicit"]
      removelist.map(item=>{
        fs=fs.replace(item,"")
      })

      try{
        console.log(fs)
        client.player.lyrics(fs).then((result)=>{
          const lyr=result.lyrics.match(/[\s\S]{1,2000}/g);
          console.log(lyr[0])
          count=0
          lyr.map((lyric)=>{
            const emb= new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setFooter(`Sayfa ${count+1}/${lyr.length}|| Developed by Krios`,"https://images-ext-2.discordapp.net/external/kkMwKH9Wqbw-3yvOxKAKUxk6tiGkI9G8RE08e0e3gsQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/484669487698804747/f9e87192b21bad5dce510c10b419a79c.webp")
            .setDescription(lyr[count])
            if (count==0){
              emb.setAuthor(`'${result.title}' Şarkı Sözleri:`,message.guild.iconURL({ dynamic: true }))
            }
            message.channel.send(emb)
            count+=1
          })
            
        }).catch((err)=>{
          if (err.message.startsWith("Cannot read property")){
            message.channel.send("Şarkı sözü bulunamadı.")
          }
          else{
            console.log(err)
          }
        })
      }
      catch(err){
        console.log(err)
      }
    }
    if ((message.content.split(" ").slice(0,1)==",remove")||(message.content.split(" ").slice(0,1)==",r")){
      queue=" "
      sarki=" "
      const nameraw = message.content.split(" ").slice(1)
      const n = nameraw.join(" ")
      const no=parseInt(n)
      if (!message.member.voice.channel) return message.channel.send(` Seslide değilsiniz !`);

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz !`);

      if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik yok !`);
      try{
        queue = client.player.getQueue(message);
        sarki= `[${queue.tracks[no].title}](${queue.tracks[no].url}) listeden kaldırıldı.`
        

      }
      catch(err){
        console.log(err)
      }
      


      try{
        
        client.player.remove(message,no)
        const emb= new Discord.MessageEmbed()
        .setDescription(sarki)
        message.channel.send(emb) 

      }
      catch (err){
        console.log(err)
       

      }

    }
    if ((message.content.split(" ").slice(0,1)==",clear")){
      if (!message.member.voice.channel) return message.channel.send(`Seslide değilsiniz !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Botla aynı kanalda değilsiniz !`);

        if (!client.player.getQueue(message)) return message.channel.send(`Şu anda müzik yok`);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`Listede sadece 1 şarkı var.`);

        client.player.clearQueue(message);

        message.channel.send(`Liste temizlendi.`);
    }
    if ((message.content.split(" ").slice(0,1)==",help")){

    
      if (message.content.split(" ").slice(1,2)=="music" ||message.content.split(" ").slice(1,2)=="müzik"||message.content.split(" ").slice(1,2)=="m"){
        var list=[",play/ ,p",",queue/,q",",np/,nowplaying",",skip/,s",",pause/,ps",",resume/,rs",",join/,j",",leave/,dc",",volume/,v",",shuffle/,sh",",loop/,lp",",filter/,f",",skipto/,st/,jump",",multiadd/,ma",",seek/,sk",",lyrics/,l",",remove/,r",",clear/,c"]
        var commands={",play/ ,p":"İsmini veya linkini yazdığınız parça/listeyi çalar/sıraya ekler.",",queue/,q":"Çalma listesini görüntüler.",",np/,nowplaying":"Çalan şarkının ayrıntılarını gösterir.",",skip/,s":"Çalan şarkıyı geçer.",",pause/,ps":"Şarkıyı durdurur.",",resume/,rs":"Durdurulan şarkıyı devam ettirir.",",join/,j":"Botun sesli kanala katılmasını sağlar.",",leave/,dc":"Botun sesli kanaldan çıkmasını sağlar",",volume/,v":"Ses düzeyini ayarlar(1-100)",",shuffle/,sh":"Şarkı listesini karıştırır.",",loop/,lp":"Şarkıyı veya ',loop queue' komutuyla çalma listesini döngüye almanızı, döngüden çıkarmanızı sağlar.",",filter/,f":"Yazdığınız filtreyi uygular/kaldırır. (,filters komutuyla mevcut filtreleri görebilirsiniz.)",",skipto/,st/,jump":"Çalma listesinde istediğiniz şarkıya atlamanızı sağlar.",",multiadd/,ma":"Birden fazla şarkı eklemenizi sağlar.",",seek/,sk":"Şarkının yazdığınız saniyesine atlar.",",lyrics/,l":"Çalan şarkının sözlerini gönderir.",",remove/,r":"İstediğiniz şarkıyı listeden kaldırmanızı sağlar",",clear/,c":"Çalma listesini temizler."}
        const FieldsEmbed = new Pagination.FieldsEmbed();

        FieldsEmbed.embed
        .setColor("RANDOM")
        .setAuthor(message.author.username)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter("Developed by Krios(Special thanks to AuRoRa,Auba)","https://images-ext-2.discordapp.net/external/kkMwKH9Wqbw-3yvOxKAKUxk6tiGkI9G8RE08e0e3gsQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/484669487698804747/f9e87192b21bad5dce510c10b419a79c.webp")
        FieldsEmbed.setArray(list)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setElementsPerPage(6)
        .setPageIndicator(true)
        .formatField("Müzik Komutları", (cmd) => `**${cmd}**\n${commands[cmd]}`);
        FieldsEmbed.build();

        
        const emb= new Discord.MessageEmbed()
        .setTitle("Music Help")
        .addField("0","0")

      }
    }
    if ((message.content.split(" ").slice(0,1)==",filters")){
      filters= ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding']
      te="**8D:**\nSese derinlik ve panning vererek etrafınızda dönüyormuş gibi davranmasını sağlar.\n**gate:**\nSesin bazı kesitlerinde ses düzeyini ayarlayarak gürültü önler.\n**haas:**\nSesi echo sayılmayacak kadar hızlı bir şekilde tekrarlayarak 'öncelik efekti' uygular.\n**phaser:**\nSese bir dizi dalgalanmalar ekleyerek elektronik bir efekt verir.\n**treble:**\nTiz sesleri güçlendirir.\n**tremolo:**\nSesin titreşmesini sağlar.\n**vibrato:**\nSesin rastgele titreşmesini sağlar.\n**reverse:**\nŞarkının tersten çalmasını sağlar.\n**karaoke:**\nVarsa şarkıdaki vokallerin ses düzeyini azaltır.Bazı şarkılarda daha etkili olabilir.\n**flanger:**\nSesi biri titreşimli diğeri gecikmeli/titreşimli olacak şekilde iki ayrı ses dalgasına ayırıp mixler.\n**mcompand:**\nSesi frekanslara ayırıp sıkıtırarak multiband genişliğini artırır.\n**pulsator:**\nSesi hızlı bir şekilde sol kulak ve sağ kulak arasında döndürür.\n**subboost:**\nŞarkıdaki sub bass'ı güçlendirir.\n**bassboost**\nŞarkıdaki bası güçlendirir.\n**vaporwave:**\nSesi yavaşlatarak pitch'i düşürür.\n**nightcore**\nSesi hızlandırarak pitch'i artırır.\n**normalizer:**\nSes girişini ayarlayarak sesi belirli bir düzeye getirir.\n**surrounding:**\nSesin 3 boyutlu olmasını sağlar. "

     
      const filterEmbed= new Discord.MessageEmbed()
      .setTitle("Mevcut Filtreler")
      .setDescription(te)
      .setFooter("Developed by Krios","https://images-ext-2.discordapp.net/external/kkMwKH9Wqbw-3yvOxKAKUxk6tiGkI9G8RE08e0e3gsQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/484669487698804747/f9e87192b21bad5dce510c10b419a79c.webp")
      message.channel.send(filterEmbed)

    }
    if ((message.content.split(" ").slice(0,1)==",playerinfo")){
      try{
        const stats= client.player.getStats
        console.log(`Uptime:${stats.uptime}\nUsers:${stats.users}`)
      }
      catch (err){
        console.log(err)
      }
      
    }
    if ((message.content.split(" ").slice(0,1)==",dız")){
      if (message.member.hasPermission(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) {
        try{
        name=message.content.split(" ").slice(1,2)[0]
      emoji=message.content.split(" ").slice(2,3)[0]
      const emojiId = emoji.match(/([0-9]+)/)[0];
      if (!emojiId) return message.reply('Emoji ID not found');

      message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emojiId}`, name)
      .then((newEmoji) => {
        message.react(newEmoji);
      })
      .catch((err) => {
        console.error(err);
        message.react('👎');
      })

      }
      catch(err) {
      console.log(err);
      }
    
    }
      

      

    }


    



}) // end of on_message event

function format(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


client.player.on("error",(message,error)=>{
  console.log(error)
})
client.player.on("queueEnd",(message,queue)=>{
  
})

client.player.on("trackAdd",(message,queue,track)=>{
  var embed=new Discord.MessageEmbed()
  .setTitle("Sıraya Eklendi")
  .setColor("RANDOM")
  .setDescription(`[${track.title}](${track.url}) - <@${track.requestedBy.id}>`)
  .setFooter(`Uzunluk: ${track.duration}`)
  message.channel.send(embed)

})
client.player.on("playlistAdd",(message,queue,playlist)=>{
  console.log(playlist)
  var embed=new Discord.MessageEmbed()
  .setTitle(`${playlist.tracks.length} şarkı sıraya eklendi.`)
  .setColor("RANDOM")
  .setDescription(`[${playlist.title}](${playlist.external_urls.spotify}) - <@${playlist.tracks[0].requestedBy.id}>`)
  .setThumbnail(`${playlist.thumbnail}`)
  message.channel.send(embed)

})
client.player.on("channelEmpty",(message,queue)=>{
  console.log(queue)
  console.log("Kanaldaki tüm kullanıcılar çıktı.")
})

const botToken = process.env['TOKEN']
keepAlive()
client.login(botToken)