// Init AOS
AOS.init({ duration: 1200, once: true });
lucide.createIcons();

// Intro Particles
const container = document.getElementById("particle-container");
for (let i = 0; i < 50; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 4 + 1;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}%`;
  p.style.setProperty("--duration", `${Math.random() * 10 + 5}s`);
  p.style.animationDelay = `${Math.random() * 5}s`;
  container.appendChild(p);
}

// Music Logic
const music = document.getElementById("weddingMusic");
let isPlaying = false;

function toggleMusic() {
  const btn = document.getElementById("musicBtn");
  if (isPlaying) {
    music.pause();
    btn.classList.add("opacity-50");
  } else {
    music.play();
    btn.classList.remove("opacity-50");
  }
  isPlaying = !isPlaying;
}

function openInvitation() {
  const gate = document.getElementById("gate");
  gate.style.opacity = "0";
  gate.style.pointerEvents = "none";
  if (!isPlaying) toggleMusic();
  setTimeout(() => (gate.style.display = "none"), 1000);
}

// URL Params
const urlParams = new URLSearchParams(window.location.search);
const to = urlParams.get("to");
if (to) document.getElementById("guest-name").innerText = to;
if (to) document.getElementById("nama").value = to;

// Countdown
const target = new Date("October 13, 2026 00:00:00").getTime();
const countdownEl = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  const label = (value, single, plural) => (value <= 1 ? single : plural);
  let isiElement = "";

  if (diff > 0) {
    isiElement = `
                  <div class="glass-premium px-4 py-3 rounded-2xl border-white/10 min-w-[70px]">
                      <span class="block text-2xl font-serif text-gold-500">${d}</span>
                      <span class="text-[9px] uppercase tracking-widest text-white/50">${label(
                        d,
                        "Day",
                        "Days"
                      )}</span>
                  </div>
                  <div class="glass-premium px-4 py-3 rounded-2xl border-white/10 min-w-[70px]">
                      <span class="block text-2xl font-serif text-gold-500">${h}</span>
                      <span class="text-[9px] uppercase tracking-widest text-white/50">${label(
                        h,
                        "Hour",
                        "Hours"
                      )}</span>
                  </div>
                  <div class="glass-premium px-4 py-3 rounded-2xl border-white/10 min-w-[70px]">
                      <span class="block text-2xl font-serif text-gold-500">${m}</span>
                      <span class="text-[9px] uppercase tracking-widest text-white/50">${label(
                        m,
                        "Minute",
                        "Minutes"
                      )}</span>
                  </div>
                  <div class="glass-premium px-4 py-3 rounded-2xl border-white/10 min-w-[70px]">
                      <span class="block text-2xl font-serif text-gold-500">${s}</span>
                      <span class="text-[9px] uppercase tracking-widest text-white/50">${label(
                        s,
                        "Second",
                        "Seconds"
                      )}</span>
                  </div>
              `;
  } else if (diff === 0) {
    isiElement = `<p class="font-serif text-xl tracking-[0.5em] uppercase mb-8 opacity-70">Today is Special Moment</p>`;
  } else {
    isiElement = `<p class="font-serif text-xl tracking-[0.5em] uppercase mb-8 opacity-70">Time Flies from</p>`;
  }

  countdownEl.innerHTML = isiElement;
}, 1000);

// function handleRSVP(e) {
//   e.preventDefault();
//   const success = document.createElement("div");
//   success.className =
//     "fixed inset-0 z-[300] bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-6 text-white text-center";
//   success.innerHTML = `
//                 <div>
//                     <div class="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
//                         <i data-lucide="check" class="w-10 h-10 text-white"></i>
//                     </div>
//                     <h2 class="font-serif text-4xl mb-4 italic">Terima Kasih</h2>
//                     <p class="text-stone-400 mb-10 max-w-sm mx-auto">Konfirmasi kehadiran Anda telah tersimpan. Kami sangat menantikan kehadiran Anda.</p>
//                     <button onclick="this.parentElement.parentElement.remove()" class="px-12 py-4 bg-white text-stone-900 rounded-full font-bold uppercase tracking-widest text-xs">Sama-sama</button>
//                 </div>
//             `;
//   document.body.appendChild(success);
//   lucide.createIcons();
//   e.target.reset();
// }

// ini untuk RSVP langsung ke WA
function handleRSVP(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const doa = document.getElementById("doa").value;
  const attend = document.querySelector('input[name="attend"]:checked').value;

  const status = attend === "yes" ? "✅ Dapat Hadir" : "❌ Berhalangan Hadir";

  const pesan = `*Konfirmasi Kehadiran*

👤 Nama: ${nama}
📌 Status: ${status}

💌 Ucapan / Doa:
${doa}`;

  const nomor = "6287752300404";

  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}
