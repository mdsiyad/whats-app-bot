const fs = require("fs");

const {
  Client,
  LegacySessionAuth,
  LocalAuth,
  MessageMedia,
  Buttons,
  List 
} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Path where the session data will be stored
// const SESSION_FILE_PATH = "/session.json";

// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     console.log(SESSION_FILE_PATH)
//     sessionData = require(SESSION_FILE_PATH);
// }

const client = new Client({
  authStrategy: new LocalAuth({
    // session:sessionData
    clientId: "client-one",
  }),
//   puppeteer: {
//     headless: false,
//     args: ['--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-extensions',
//         '--disable-dev-shm-usage',
//         '--disable-accelerated-2d-canvas',
//         '--no-first-run',
//         '--no-zygote',
//         '--single-process', // <- this one doesn't works in Windows
//         '--disable-gpu']
// }
});

client.initialize();

client.on("qr", (qr) => {
  console.log("QR RECEIVED");
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("session", session);
  console.log("WHATSAPP WEB => Authenticated");
});

const members = ["252615656030", "252610556666"];

client.on("ready", () => {
  console.log("Client is ready!");

  //   members.map(value => {
  //     const chatId = value +"@c.us"
  //     message = "Hi, this is test message from my BOT"
  //     client.sendMessage(chatId,message);
  // })
});

client.on("message", async (message) => {
  //   message.getInfo().then((info) => {
  //     console.log(info)
  //   })

  if (message.hasMedia) {
    const base64Image = await message.downloadMedia();
    // console.log(media.data);

    const media = new MessageMedia(base64Image.mimetype, base64Image.data);
    const chatId = message.from;
    client.sendMessage(chatId, media, { caption: "this is my caption" });
  } 
  else if (!message.hasMedia) {
    const chatId = message.from;

    const number_details = await client.getNumberId(message.from.substring(0, message.from.indexOf("@c.us"))); // get mobile number details
    const productsList = new List(
      "Amazing deal on these products",
      "View products",
      [
          {
              title: "Products list",
              rows: [
                  { id: "apple", title: "Apple" },
                  { id: "mango", title: "Mango" },
                  { id: "banana", title: "Banana" },
              ],
          },
      ],
      "Please select a product"
  );


    message.reply('Received By 🤖');
    client.sendMessage(chatId, 'processing pleas wait...');

    // const sendMessageData = await client.sendMessage(number_details._serialized, productsList); // send message
    // console.log('msg sent now closing ', sendMessageData)


  } 
   if(message.body === 'all') {
    // Mention everyone
    const chat = await message.getChat();
    let text = "";
    let mentions = [];
  
    for(let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
        
        mentions.push(contact);
        text += `@${participant.id.user} \n`;
    }
  
    await chat.sendMessage(text, { mentions });
  }






  //extract the number from the message and put it in sender variable.
  const sender = message.from.substring(0, message.from.indexOf("@c.us"));
  //   console.log('sender', sender);

  if (sender == 252615656030) {
    if (message.body.includes("hhh")) {
      message.reply("Qosolkaaga qurux!");
      message.reply("😂");
    } else if (message.body == "Asc" || message.body == "asc") {
      message.reply("Wcs.");
    } else if (message.body == "hye" || message.body == "haye") {
      message.reply("haye hee.");
    } else if (
      message.body == "haye qaali" ||
      message.body == "haye qali" ||
      message.body == "haye mcne" ||
      message.body == "haye macaane" ||
      message.body == "Qaali"
    ) {
      message.reply("haye qaali.");
    } else if (
      message.body.includes("lacag") ||
      message.body.includes("Lacag ayaan")
    ) {
      message.reply("Waan ka xumahay, wax lacag ah kuma hayo.");
    } else if (
      message.body.includes("insha allah") ||
      message.body.includes("inshaa allah") ||
      message.body.includes("inshaa alah")
    ) {
      message.reply("Insha allah");
    } else if (
      message.body.includes("habeen") ||
      message.body.includes("habeen wanagsan") ||
      message.body.includes("habeen wngsn")
    ) {
      message.reply("wacan oo wanagsan qaali");
    }
    
    else if (
        message.body.includes("Seethy") ||
        message.body.includes("seethy") ||
        message.body.includes("seetahay") ||
        message.body.includes("ii wrn") ||
        message.body.includes("wrn") ||
        message.body.includes("waran") ||
        message.body.includes("Mala fayaa") ||
        message.body.includes("mala fayaa") ||
        message.body.includes("mala faayaa") 
      ) {
        message.reply("Alxamdulillah, ii wrn?");
      }


      else if (
        message.body.includes("Baaba") ||
        message.body.includes("baaba") ||
        message.body.includes("kariima") ||
        message.body.includes("baabaa") 
      ) {
        message.reply("Baaba, Kariima");
      }
      else if (
        message.body.includes("Shukran") ||
        message.body.includes("shukan") 
      ) {
        message.reply("Baaba, Kariima");
      }
    else {
      message.reply("Ma fahmin");
    }
  }

  if (message.body === "Hi") {
    
    message.reply("Hi!");
  } else if (message.body == "Asc") {
    message.reply("Wcs.");
  }
});
