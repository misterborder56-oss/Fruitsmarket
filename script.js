// ============================
// SUPABASE
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
// FRUTAS (tus imágenes)
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
"https://i.ibb.co/vCKtgj95/image-processing20250905-1-5b7b3b-33.jpg"
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

// ============================
// GENERAR TOKEN
// ============================

function generarToken() {
  return Math.random().toString(36).substring(2) + Date.now();
}

// ============================
// PUBLICAR
// ============================

publicarBtn.addEventListener("click", async () => {

  const das = [];
  document.querySelectorAll("#das .slot").forEach(s=>{
    if(s.dataset.img) das.push(s.dataset.img);
  });

  const quieres = [];
  document.querySelectorAll("#quieres .slot").forEach(s=>{
    if(s.dataset.img) quieres.push(s.dataset.img);
  });

  if(das.length === 0 || quieres.length === 0){
    alert("Completa la oferta");
    return;
  }

  const ownerToken = generarToken();

  await supabase.from("ofertas").insert({
    usuario: usuarioActual,
    numero: numeroActual,
    das,
    quieres,
    owner_token: ownerToken
  });

  localStorage.setItem("ownerToken", ownerToken);

  cargarOfertas();
});

// ============================
// CARGAR OFERTAS
// ============================

async function cargarOfertas() {

  const { data } = await supabase
    .from("ofertas")
    .select("*")
    .order("created_at", { ascending: false });

  ofertasDiv.innerHTML = "";

  const tokenLocal = localStorage.getItem("ownerToken");

  data.forEach(oferta => {

    let botones = `
      <button onclick="aceptarOferta('${oferta.numero}','${oferta.usuario}')">
        Aceptar
      </button>
    `;

    if(oferta.owner_token === tokenLocal){
      botones += `
        <button onclick="eliminarOferta('${oferta.id}')">
          🗑 Eliminar
        </button>
      `;
    }

    const card = document.createElement("div");
    card.classList.add("oferta-card");

    card.innerHTML = `
      <strong>${oferta.usuario}</strong>
      <p>🎁 Da:</p>
      ${oferta.das.map(img=>`<img src="${img}" width="50">`).join("")}
      <p>🎯 Quiere:</p>
      ${oferta.quieres.map(img=>`<img src="${img}" width="50">`).join("")}
      ${botones}
    `;

    ofertasDiv.appendChild(card);
  });
}

// ============================
// ELIMINAR
// ============================

async function eliminarOferta(id){
  await supabase.from("ofertas").delete().eq("id", id);
  cargarOfertas();
}

// ============================
// ACEPTAR
// ============================

function aceptarOferta(numero, usuario){
  const mensaje = `Hola ${usuario}, quiero aceptar tu trade 🔥`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`);
}

// ============================
// TIEMPO REAL
// ============================

supabase
  .channel("realtime-ofertas")
  .on("postgres_changes", { event: "*", schema: "public", table: "ofertas" },
    () => cargarOfertas()
  )
  .subscribe();
