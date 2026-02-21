// ============================
// SUPABASE CONFIG REAL
// ============================

const supabase = window.supabase.createClient(
  "https://bgqrdyxkaxotfyleozor.supabase.co",
  "sb_publishable_lu2RhjWQVjGXHhwyJhLjQg_t3ZYUvVm"
);

// ============================
// ELEMENTOS
// ============================

const loginBox = document.getElementById("login");
const panel = document.getElementById("panel");
const loginBtn = document.getElementById("login-enter");
const publicarBtn = document.getElementById("publicar");

const nombreInput = document.getElementById("nombre");
const numberInput = document.getElementById("number");

const dasDiv = document.getElementById("das");
const quieresDiv = document.getElementById("quieres");
const ofertasDiv = document.getElementById("ofertas");

let usuarioActual = null;
let numeroActual = null;

// ============================
// 🔥 TODAS LAS FRUTAS
// ============================

const frutas = [
"https://i.ibb.co/R4yhDF1Z/image-processing20250905-1-5b7b3b-6.jpg",
"https://i.ibb.co/FR0hbX7/image-processing20250905-1-5b7b3b-7.jpg",
"https://i.ibb.co/93kLsNgh/image-processing20250905-1-5b7b3b-40.jpg",
"https://i.ibb.co/3yD7f5SM/image-processing20250905-1-5b7b3b-39.jpg",
"https://i.ibb.co/jvS5KxKG/image-processing20250905-1-5b7b3b-38.jpg",
"https://i.ibb.co/DPrVL8jh/image-processing20250905-1-5b7b3b-37.jpg",
"https://i.ibb.co/vCjjRYQc/image-processing20250905-1-5b7b3b-36.jpg",
"https://i.ibb.co/wrBFt6Ns/image-processing20250905-1-5b7b3b-35.jpg",
"https://i.ibb.co/B56HbSWk/image-processing20250905-1-5b7b3b-34.jpg",
"https://i.ibb.co/vCKtgj95/image-processing20250905-1-5b7b3b-33.jpg",
"https://i.ibb.co/4R5NkdCg/image-processing20250905-1-5b7b3b-32.jpg",
"https://i.ibb.co/MD50TN3c/image-processing20250905-1-5b7b3b-31.jpg",
"https://i.ibb.co/6004qncx/image-processing20250905-1-5b7b3b-30.jpg",
"https://i.ibb.co/9mf3twFp/image-processing20250905-1-5b7b3b-29.jpg",
"https://i.ibb.co/7dyd3gcM/image-processing20250905-1-5b7b3b-28.jpg",
"https://i.ibb.co/N2HP9D2w/image-processing20250905-1-5b7b3b-27.jpg",
"https://i.ibb.co/zCYdwy5/image-processing20250905-1-5b7b3b-26.jpg",
"https://i.ibb.co/Z1dLxCh8/image-processing20250905-1-5b7b3b-25.jpg",
"https://i.ibb.co/HLyhYNGL/image-processing20250905-1-5b7b3b-24.jpg",
"https://i.ibb.co/CpzyxBGK/image-processing20250905-1-5b7b3b-23.jpg",
"https://i.ibb.co/bM2pvzzN/image-processing20250905-1-5b7b3b-22.jpg",
"https://i.ibb.co/WpjPw3F6/image-processing20250905-1-5b7b3b-21.jpg",
"https://i.ibb.co/dsR2TwgS/image-processing20250905-1-5b7b3b-20.jpg",
"https://i.ibb.co/PV4KHKn/image-processing20250905-1-5b7b3b-19.jpg",
"https://i.ibb.co/KjLk9zSg/image-processing20250905-1-5b7b3b-17.jpg",
"https://i.ibb.co/w2DR1pJ/image-processing20250905-1-5b7b3b-16.jpg",
"https://i.ibb.co/Hft7dzqs/image-processing20250905-1-5b7b3b-15.jpg",
"https://i.ibb.co/d0KNqBpr/image-processing20250905-1-5b7b3b-14.jpg",
"https://i.ibb.co/Lb5zCKG/image-processing20250905-1-5b7b3b-13.jpg",
"https://i.ibb.co/S7cf7BVj/image-processing20250905-1-5b7b3b-12.jpg",
"https://i.ibb.co/5xsPjtcs/image-processing20250905-1-5b7b3b-11.jpg",
"https://i.ibb.co/TqhjKvDn/image-processing20250905-1-5b7b3b-10.jpg",
"https://i.ibb.co/yBFXGbzP/image-processing20250905-1-5b7b3b-9.jpg",
"https://i.ibb.co/rf483Kd9/image-processing20250905-1-5b7b3b-8.jpg",
"https://i.ibb.co/TqhyyMsf/image-processing20250905-1-5b7b3b-5.jpg",
"https://i.ibb.co/9Hq0y39r/image-processing20250905-1-5b7b3b-4.jpg",
"https://i.ibb.co/r2S59z61/image-processing20250905-1-5b7b3b-3.jpg",
"https://i.ibb.co/JbFhMZc/image-processing20250905-1-5b7b3b-2.jpg",
"https://i.ibb.co/qLmwKqfT/image-processing20250905-1-5b7b3b.jpg"
];

// ============================
// LOGIN
// ============================

loginBtn.addEventListener("click", () => {
  if (!nombreInput.value || !numberInput.value) {
    alert("Completa los datos");
    return;
  }

  usuarioActual = nombreInput.value;
  numeroActual = numberInput.value;

  loginBox.style.display = "none";
  panel.style.display = "block";

  cargarOfertas();
});
