const supabase = window.supabase.createClient(
  "https://bgqrdyxkaxotfyleozor.supabase.co",
  "sb_publishable_lu2RhjWQVjGXHhwyJhLjQg_t3ZYUvVm"
);

// Crear caja de mensajes en pantalla
const estado = document.createElement("div");
estado.style.position = "fixed";
estado.style.bottom = "10px";
estado.style.left = "10px";
estado.style.right = "10px";
estado.style.background = "black";
estado.style.color = "lime";
estado.style.padding = "10px";
estado.style.fontSize = "12px";
estado.style.zIndex = "9999";
estado.innerText = "Probando conexión...";
document.body.appendChild(estado);

async function pruebaConexion() {

  const { data, error } = await supabase
    .from("ofertas")
    .select("*")
    .limit(1);

  if (error) {
    estado.style.color = "red";
    estado.innerText = "ERROR: " + error.message;
  } else {
    estado.style.color = "lime";
    estado.innerText = "Conectado correctamente a Supabase ✅";
  }
}

pruebaConexion();
