/* Config */
const twitchTvHandle = "Toadofsky";
const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 4 * 1000; // 4 seconds

/* DOM */
const container = document.querySelector(".alerts");
const img = new Image();
const queue = new Queue();

/* Sound Effects */
const notifyAudio = new Audio("notification.ogg");
const magicChime = new Audio("Magic_Chime.mp3");

/* GIFs */
const jumpGif = "https://media.giphy.com/media/afLwiPOhs4dcH3phEY/giphy.gif"
const welcomeGif = "https://media.giphy.com/media/afLwiPOhs4dcH3phEY/giphy.gif"
const pizzaGif = "https://media.giphy.com/media/3o6nUXaNE4wdhq8Foc/giphy.gif";


// Resolve promise after duration
const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

ComfyJS.Init(twitchTvHandle);
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);

  if (command == "jump") {
    new gifAlert(user, jumpGif, notifyAudio, command);
  }

  if (command == "welcome") {
    new gifAlert(message, welcomeGif, magicChime, command);
  }

  if (flags.broadcaster && command == "pizza") {
    new gifAlert(message, pizzaGif, magicChime, command);
  }

  if (flags.broadcaster && command == "pause") {
    // Clear GIF queue and pause for PAUSE_DURATION
    queue.clear();
    queue.pause(PAUSE_DURATION);
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  console.log(user + ":", message);
};

const generateTitle = {
  jump: " get ready!",
  welcome: " welcome aboard!",
  pizza: " needed a pizza party!",
};

function gifAlert(user, gif, audio, type) {
  queue.add(async () => {
    audio.play();
    container.innerHTML = `
      <h1 class="text-shadows">${user + generateTitle[type]}</h1>
      <img src="${gif}" />
    `;
    container.style.opacity = 1;

    await wait(DISPLAY_DURATION);

    if (!queue.isLooping) {
      container.style.opacity = 0;
    }

  });
}
