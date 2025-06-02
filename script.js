const videos = [
  {
    url: "https://player.vimeo.com/video/1089631527?h=d67902f963&autoplay=1&muted=1"
  },
    {
    url: "https://player.vimeo.com/video/1089631438?h=81697939fc&autoplay=1&muted=1"
  },
  {
    url: "https://player.vimeo.com/video/1089631694?h=93bad28916&autoplay=1&muted=1"
  },
  {
    url: "https://player.vimeo.com/video/1089631711?h=02c7a70e35&autoplay=1&muted=1"
  },
  {
    url: "https://player.vimeo.com/video/1089625015?h=f0067b5f9b&autoplay=1&muted=1"
  },
  {
    url: "https://player.vimeo.com/video/1089655279?h=fccef3e55d&autoplay=1&muted=1"
  },
  {
    url: "https://player.vimeo.com/video/1089655327?h=ccd5d1c6ee&autoplay=1&muted=1"
  }
  
];

const videoList = document.getElementById("videoList");
let currentIndex = 0;

// Create video sections
videos.forEach((video, index) => {
  const wrapper = document.createElement("div");
  wrapper.className = "video-container";
  wrapper.dataset.index = index;

  const iframe = document.createElement("iframe");
  iframe.src = video.url + `&t=${Date.now()}`;
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.id = `video-${index}`;

  const footer = document.createElement("div");
  footer.className = "video-footer";
  footer.textContent = "@Morthad";

  wrapper.appendChild(iframe);
  wrapper.appendChild(footer);
  videoList.appendChild(wrapper);
});

function scrollToVideo(index) {
  if (index < 0 || index >= videos.length) return;
  const target = document.querySelector(`.video-container[data-index="${index}"]`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    currentIndex = index;
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const iframe = entry.target.querySelector("iframe");
    if (!iframe) return;

    const src = new URL(iframe.src);

    if (entry.isIntersecting) {
      src.searchParams.set("autoplay", "1");
      src.searchParams.set("muted", "0");
    } else {
      src.searchParams.set("autoplay", "0");
    }

    iframe.src = src.toString();
  });
}, {
  threshold: 0.8
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".video-container").forEach(container => {
    observer.observe(container);
  });
});
