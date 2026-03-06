const items = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const content = document.getElementById('lightboxContent');

let index = 0;

function openLightbox(i) {
  index = i;
  const item = items[i];
  const isVideo = item.tagName.toLowerCase() === "video";

  content.innerHTML = "";

  if (isVideo) {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    content.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    content.appendChild(img);
  }

  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  content.innerHTML = "";
}

function next() {
  index = (index + 1) % items.length;
  openLightbox(index);
}

function prev() {
  index = (index - 1 + items.length) % items.length;
  openLightbox(index);
}

items.forEach((item, i) => {
  item.addEventListener("click", () => openLightbox(i));
});

document.getElementById("closeBtn").onclick = closeLightbox;
document.getElementById("nextBtn").onclick = next;
document.getElementById("prevBtn").onclick = prev;

document.addEventListener("keydown", e => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});
