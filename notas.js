document.addEventListener("DOMContentLoaded", () => {
  const notaForm = document.getElementById("nota-form");
  const notaLista = document.getElementById("nota-lista");

  const db = firebase.firestore();
  const notasRef = db.collection("notas");

  // Cargar notas existentes
  function cargarNotas() {
    notaLista.innerHTML = "";
    notasRef.orderBy("fecha", "desc").onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const nota = doc.data();
        const notaItem = document.createElement("div");
        notaItem.className = "nota-item";
        notaItem.innerHTML = `
          <h3>${nota.categoria} - ${new Date(nota.fecha.toDate()).toLocaleDateString()}</h3>
          <p>${nota.texto}</p>
          <button class="borrar-nota" data-id="${doc.id}">Eliminar</button>
        `;
        notaLista.appendChild(notaItem);
      });

      // Manejar eliminación
      document.querySelectorAll(".borrar-nota").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          notasRef.doc(id).delete();
        });
      });
    });
  }

  // Guardar nueva nota
  notaForm.addEventListener("submit", e => {
    e.preventDefault();
    const texto = notaForm["texto-nota"].value;
    const categoria = notaForm["categoria-nota"].value;

    if (texto.trim()) {
      notasRef.add({
        texto,
        categoria,
        fecha: new Date()
      }).then(() => {
        notaForm.reset();
      });
    }
  });

  cargarNotas();
});
