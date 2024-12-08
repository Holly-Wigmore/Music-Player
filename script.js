const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
  {
    album: "Espresso",
    emblem: "I can't relate to desperation",
    "bg-color": ["#0396FF", "#0D1827"],
    "accent-color": "#0396FF",
    url: "./espresso.jpg",
    spotify:
      "https://open.spotify.com/embed/track/2qSkIjg1o9h3YT9RAgYN75?si=50f4128c321f4f0b",
  },
  {
    album: "Short n Sweet",
    emblem: "I know I've been known to share",
    "bg-color": ["#3df5a7", "#0D1827"],
    "accent-color": "#3df5a7",
    url: "./sweet.jpg",
    spotify:
      "https://open.spotify.com/embed/track/5G2f63n7IPVPPjfNIGih7Q?si=3c823cc018e848d0",
  },
  {
    album: "Emails I Can't Send",
    emblem: "I feel so much lighter like a feather with you off my mind",
    "bg-color": ["#727272", "#0D1827"],
    "accent-color": "#727272",
    url: "./emails.jpg",
    spotify:
      "https://open.spotify.com/embed/track/2Zo1PcszsT9WQ0ANntJbID?si=f5e5c21afbb447b4",
  },
  {
    album: "Emails I Can't Send",
    emblem: "Lookin at you got me thinkin nonsense",
    "bg-color": ["#0396FF", "#0D1827"],
    "accent-color": "#0396FF",
    url: "./emails.jpg",
    spotify:
      "https://open.spotify.com/embed/track/6dgUya35uo964z7GZXM07g?si=f21acfdea70b40b9",
  },
  {
    album: "Short n Sweet",
    emblem: "Who's the cute boy with the white jacket",
    "bg-color": ["#3df5a7", "#0D1827"],
    "accent-color": "#3df5a7",
    url: "./sweet.jpg",
    spotify:
      "https://open.spotify.com/embed/track/1UHS8Rf6h5Ar3CDWRd3wjF?si=c952a442450e4a7a",
  },
  {
    album: "Short n Sweet",
    emblem: "Please, please, please don't prove I'm right",
    "bg-color": ["#727272", "#0D1827"],
    "accent-color": "#727272",
    url: "./sweet.jpg",
    spotify:
      "https://open.spotify.com/embed/track/2tHwzyyOLoWSFqYNjeVMzj?si=e2650e9a597b4fad",
  },
  {
    album: "Emails I Can't Send",
    emblem: "These are fast times and fast nights",
    "bg-color": ["#0396FF", "#0D1827"],
    "accent-color": "#0396FF",
    url: "./emails.jpg",
    spotify:
      "https://open.spotify.com/embed/track/6n05BgVkxxz2k5ICZYa2PH?si=b1bcf6ea83f04789",
  },
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
  heroDiv.classList.remove("album-transition");
  document.addEventListener("keydown", handleKeyScroll);
  scrollLeft.disabled = false;
  scrollRight.disabled = false;
  scrollLeft.classList.remove("key-press-hover-left");
  scrollRight.classList.remove("key-press-hover-right");

  for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
  if (index + val >= 0 && index + val < albums.length) {
    updateDisplay((index += val));
  }
};

const handleKeyScroll = (e) => {
  if (e.key == "ArrowLeft") {
    scrollLeft.classList.add("key-press-hover-left");
    handleClickScroll(-1);
  }
  if (e.key == "ArrowRight") {
    scrollRight.classList.add("key-press-hover-right");
    handleClickScroll(1);
  }
};
let index = 0;

const updateDisplay = (index) => {
  let DELIMITER = "";

  const album = albums[index];

  for (const text of texts) text.classList.remove("show-texts");
  emblemDiv.innerHTML = "";
  scrollLeft.disabled = true;
  scrollRight.disabled = true;
  document.removeEventListener("keydown", handleKeyScroll);

  sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
  bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
  heroDiv.style.backgroundImage = `url(${album.url})`;
  albumTitleSpan.textContent = album.album;
  spotifyWidget.src = album.spotify;

  const number = index + 1;
  albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
  albumNum.style.color = album["accent-color"];

  if (index === 3) scrollRight.classList.add("hide-arrow");
  else scrollRight.classList.remove("hide-arrow");

  createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
    emblemDiv.append(node)
  );

  heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
  const spans = [];

  string = string.trim().replaceAll(" ", delimiter) + delimiter;
  const numChars = string.length;
  const degVal = 90 / (numChars / 4);

  string.split("").forEach((char, idx) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.transform = `rotate(${180 - degVal * idx}deg)`;
    if (char === delimiter) span.style.color = albums[index]["accent-color"];
    spans.push(span);
  });

  return spans;
};

updateDisplay(index);
