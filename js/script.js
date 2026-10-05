const products = [
  {
    id: "dem-em",
    name: "Đêm Êm",
    shortLabel: "ĐÊM ÊM",
    tag: "BEFORE SLEEP",
    tone: "purple",
    header: "Thư giãn trước giờ ngủ",
    description: "Cho những tối cần một khoảng lặng sau một ngày dài.",
    concept: "Dịu nhẹ, yên bình, chậm lại trước khi khép lại một ngày.",
    image: "assets/images/DemEm.png",
    audio: "assets/audio/dem-em.mp3",
    musicStyle: "Piano · ambient · ngủ ngon",
    notes: ["Cúc", "Hoa nhài", "Vỏ quế", "muối"],
    suits: ["Buổi tối", "Trước khi ngủ", "Khi cần thư giãn"],
    steps: [
      "Cho túi ngâm vào nước ấm.",
      "Ngâm chân 15–20 phút trong không gian yên tĩnh.",
      "Hít sâu và để cơ thể trở về trạng thái ngủ.",
    ],
  },
  {
    id: "tan-lam",
    name: "Tan Làm",
    shortLabel: "TAN LÀM",
    tag: "AFTER WORK",
    tone: "amber",
    header: "Thư giãn sau ngày bận rộn",
    description: "Cho giây phút hạ màn một ngày dài cố gắng.",
    concept: "Ấm áp, dễ chịu, để cơ thể có một khoảng nghỉ sau giờ làm.",
    image: "assets/images/TanLam.png",
    audio: "assets/audio/tan-lam.mp3",
    musicStyle: "Piano · acoustic · ấm áp",
    notes: ["Sả", "Vỏ cam", "Ngải cứu", "muối"],
    suits: ["Sau giờ làm", "Khi mệt mỏi", "Muốn buông xuống"],
    steps: [
      "Đổ nước ấm vào chậu rồi thả túi ngâm.",
      "Ngâm chân khoảng 15–20 phút, đặt tay lên đầu gối.",
      "Thở sâu và để lòng mình dịu lại ngay trong phút ấy.",
    ],
  },
  {
    id: "dam-mua",
    name: "Dầm Mưa",
    shortLabel: "DẦM MƯA",
    tag: "RAINY CALM",
    tone: "sage",
    header: "Ấm áp sau ướt mưa",
    description: "Cho những hôm ướt mưa trên đường về.",
    concept: "Một chút ấm áp, một chút thư thái cho ngày mưa.",
    image: "assets/images/DamMua.png",
    audio: "assets/audio/dam-mua.mp3",
    musicStyle: "Tiếng mưa · ambient · piano",
    notes: ["Gừng khô", "Sả", "Tía tô", "muối"],
    suits: ["Sau trời lạnh", "Sau khi đi mưa", "Muốn ấm dưỡng"],
    steps: [
      "Chuẩn bị một chậu nước ấm vừa đủ.",
      "Cho túi ngâm vào và ngâm chân 15–20 phút.",
      "Để cơ thể lắng lại và cảm thấy ấm ra từ bàn chân.",
    ],
  },
];

const productGrid = document.getElementById("productGrid");
const productAudio = document.getElementById("productAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const muteBtn = document.getElementById("muteBtn");
const visualizer = document.getElementById("audioVisualizer");
const playlist = document.getElementById("musicPlaylist");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const header = document.getElementById("siteHeader");

let currentTrackId = null;
let isAudioPlaying = false;

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderProductCards() {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card reveal fade-up" data-product-id="${product.id}" data-theme="${product.tone}">
          <div class="product-art">
            <span class="herb-orb" aria-hidden="true"></span>
            <span class="herb-orb" aria-hidden="true"></span>
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>

          <div class="product-body">
            <span class="product-tag">${product.tag}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="product-concept">${product.concept}</p>
          </div>

          <div class="product-actions">
            <a class="product-btn" href="product.html?id=${product.id}">Khám phá</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function updatePlayerButton() {
  if (!playPauseBtn || !visualizer) return;
  const icon = playPauseBtn.querySelector("i");

  if (!icon) return;

  if (isAudioPlaying) {
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
    playPauseBtn.setAttribute("aria-label", "Tạm dừng nhạc");
    visualizer.classList.add("playing");
  } else {
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-play-fill");
    playPauseBtn.setAttribute("aria-label", "Phát bài nhạc");
    visualizer.classList.remove("playing");
  }

  playlist?.querySelectorAll("[data-track-id]").forEach((button) => {
    const isSelected = button.dataset.trackId === currentTrackId;
    button.classList.toggle("is-playing", isSelected && isAudioPlaying);
    const action = button.querySelector(".track-action");
    const trackIcon = button.querySelector(".track-play-icon i");
    if (action) action.textContent = isSelected && isAudioPlaying ? "Tạm dừng" : "Nghe";
    if (trackIcon) {
      trackIcon.classList.toggle("bi-pause-fill", isSelected && isAudioPlaying);
      trackIcon.classList.toggle("bi-play-fill", !(isSelected && isAudioPlaying));
    }
  });
}

function updateProgressUI() {
  if (!productAudio || !seekBar || !currentTimeEl || !durationTimeEl) return;
  const duration = Number.isFinite(productAudio.duration) ? productAudio.duration : 0;
  const current = Number.isFinite(productAudio.currentTime) ? productAudio.currentTime : 0;
  const value = duration > 0 ? (current / duration) * 100 : 0;

  seekBar.value = value;
  currentTimeEl.textContent = formatTime(current);
  durationTimeEl.textContent = formatTime(duration);
}

function resetPlayer() {
  productAudio.pause();
  productAudio.currentTime = 0;
  isAudioPlaying = false;
  updatePlayerButton();
  durationTimeEl.textContent = "00:00";
  currentTimeEl.textContent = "00:00";
  seekBar.value = 0;
  volumeBar.value = productAudio.muted ? 0 : productAudio.volume;
  setMuteButtonState();
}

function setMuteButtonState() {
  if (!muteBtn) return;
  const icon = muteBtn.querySelector("i");
  if (!icon) return;

  if (productAudio.muted || productAudio.volume === 0) {
    icon.classList.remove("bi-volume-up-fill", "bi-volume-down-fill");
    icon.classList.add("bi-volume-mute-fill");
    muteBtn.setAttribute("aria-label", "Bật âm");
  } else if (productAudio.volume < 0.5) {
    icon.classList.remove("bi-volume-up-fill", "bi-volume-mute-fill");
    icon.classList.add("bi-volume-down-fill");
    muteBtn.setAttribute("aria-label", "Tắt âm");
  } else {
    icon.classList.remove("bi-volume-down-fill", "bi-volume-mute-fill");
    icon.classList.add("bi-volume-up-fill");
    muteBtn.setAttribute("aria-label", "Tắt âm");
  }
}

async function playSelectedTrack() {
  if (!currentTrackId) return;
  const track = getProductById(currentTrackId);
  if (!track) return;

  if (productAudio.src !== new URL(track.audio, document.baseURI).href) {
    productAudio.src = track.audio;
    productAudio.load();
  }
  try {
    await productAudio.play();
  } catch (error) {
    const status = document.getElementById("audioStatus");
    if (status) status.textContent = "Không phát được bản nhạc. Vui lòng thử lại.";
    console.error("Could not play the selected audio track:", error);
  }
}

async function toggleAudio() {
  if (isAudioPlaying) {
    productAudio.pause();
    return;
  }
  await playSelectedTrack();
}

function renderPlaylist(selectedId) {
  if (!playlist) return;

  playlist.innerHTML = products
    .map(
      (track) => `
        <button
          class="playlist-track${track.id === selectedId ? " is-selected" : ""}"
          type="button"
          data-track-id="${track.id}"
          aria-pressed="${track.id === selectedId}"
        >
          <span class="track-play-icon" aria-hidden="true"><i class="bi bi-play-fill"></i></span>
          <span class="track-copy">
            <span class="track-name">${track.name}</span>
            <span class="track-style">${track.musicStyle}</span>
          </span>
          <span class="track-action">Nghe</span>
        </button>
      `,
    )
    .join("");

  playlist.querySelectorAll("[data-track-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      const trackId = button.dataset.trackId;
      if (!trackId) return;

      const status = document.getElementById("audioStatus");
      if (trackId === currentTrackId && isAudioPlaying) {
        productAudio.pause();
        if (status) status.textContent = "Đang tạm dừng.";
        return;
      }

      if (trackId !== currentTrackId) {
        productAudio.pause();
        currentTrackId = trackId;
        renderPlaylist(trackId);
        resetPlayer();
      }

      if (status) status.textContent = "";
      await playSelectedTrack();
    });
  });
}

function initAudioPlayer() {
  if (!productAudio || !playlist) return;
  productAudio.volume = 0.7;
  volumeBar.value = productAudio.volume;
  setMuteButtonState();
  productAudio.preload = "none";
  renderPlaylist(currentTrackId);
  playPauseBtn.addEventListener("click", toggleAudio);

  productAudio.addEventListener("loadedmetadata", () => {
    durationTimeEl.textContent = formatTime(productAudio.duration || 0);
    updateProgressUI();
  });

  productAudio.addEventListener("timeupdate", updateProgressUI);
  productAudio.addEventListener("play", () => {
    isAudioPlaying = true;
    updatePlayerButton();
    const status = document.getElementById("audioStatus");
    if (status) status.textContent = "";
  });

  productAudio.addEventListener("pause", () => {
    isAudioPlaying = false;
    updatePlayerButton();
  });

  productAudio.addEventListener("ended", () => {
    isAudioPlaying = false;
    productAudio.currentTime = 0;
    updatePlayerButton();
    updateProgressUI();
  });

  productAudio.addEventListener("error", () => {
    const status = document.getElementById("audioStatus");
    if (status) status.textContent = "Không tải được bản nhạc này. Vui lòng thử lại sau.";
  });

  seekBar.addEventListener("input", (event) => {
    const seekValue = Number(event.target.value);
    const duration = Number.isFinite(productAudio.duration) ? productAudio.duration : 0;
    productAudio.currentTime = (seekValue / 100) * duration;
    updateProgressUI();
  });

  volumeBar.addEventListener("input", (event) => {
    const nextVolume = Number(event.target.value);
    productAudio.volume = nextVolume;
    productAudio.muted = nextVolume === 0;
    setMuteButtonState();
  });

  muteBtn.addEventListener("click", () => {
    if (productAudio.muted || productAudio.volume === 0) {
      if (productAudio.volume === 0) productAudio.volume = 0.7;
      productAudio.muted = false;
      volumeBar.value = productAudio.volume;
    } else {
      productAudio.muted = true;
      volumeBar.value = 0;
    }
    setMuteButtonState();
  });
}

function renderProductDetail() {
  const detail = document.getElementById("productDetail");
  if (!detail) return;

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = getProductById(productId);
  const notFound = document.getElementById("productNotFound");

  if (!product) {
    detail.hidden = true;
    notFound.hidden = false;
    return;
  }

  detail.dataset.theme = product.tone;
  document.title = `${product.name} — Ngâm chút`;
  document.getElementById("detailImage").src = product.image;
  document.getElementById("detailImage").alt = `Túi ngâm chân ${product.name}`;
  document.getElementById("detailTag").textContent = product.tag;
  document.getElementById("detailTitle").textContent = product.name;
  document.getElementById("detailHeader").textContent = product.header;
  document.getElementById("detailDescription").textContent = product.description;
  document.getElementById("detailConcept").textContent = product.concept;
  document.getElementById("detailNotes").innerHTML = product.notes
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.getElementById("detailMatches").innerHTML = product.suits
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.getElementById("detailSteps").innerHTML = product.steps
    .map((item) => `<li>${item}</li>`)
    .join("");

  currentTrackId = product.id;
  renderPlaylist(product.id);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initHeaderObserver() {
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");
            link.classList.toggle("active", linkTarget === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.52 },
  );

  sections.forEach((section) => observer.observe(section));
}

function init() {
  renderProductCards();
  renderProductDetail();
  initAudioPlayer();
  initScrollAnimations();
  initSmoothScroll();
  initMobileMenu();
  initHeaderObserver();
  if (productGrid) initActiveNavOnScroll();
}

window.addEventListener("DOMContentLoaded", init);
