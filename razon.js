document.addEventListener("DOMContentLoaded", () => {
  const recursosLista = document.getElementById("recursos-lista");

  const db = firebase.firestore();
  const recursosRef = db.collection("razon");

  // Cargar recursos existentes
  function cargarRecursos() {
    recursosLista.innerHTML = "";
    recursosRef.orderBy("fecha", "desc").onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const recurso = doc.data();
        const item = document.createElement("div");
        item.className = "recurso-item";
        item.innerHTML = `
          <h3>${recurso.titulo} (${recurso.categoria})</h3>
          <p>${recurso.descripcion}</p>
          ${recurso.tipo === 'video' ? `<video controls src="${recurso.enlace}"></video>` : ''}
          ${recurso.tipo ===
