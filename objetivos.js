document.addEventListener("DOMContentLoaded", () => {
  const objetivoForm = document.getElementById("objetivo-form");
  const objetivoLista = document.getElementById("objetivo-lista");

  const db = firebase.firestore();
  const objetivosRef = db.collection("objetivos");

  // Cargar metas
  function cargarObjetivos() {
    objetivoLista.innerHTML = "";
    objetivosRef.orderBy("fecha", "desc").onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const objetivo = doc.data();
        const item = document.createElement("div");
        item.className = "objetivo-item";
        item.innerHTML = `
          <h3 class="${objetivo.completado ? 'completado' : ''}">${objetivo.titulo}</h3>
          <p>${objetivo.descripcion}</p>
          <small>Fecha objetivo: ${new Date(objetivo.fecha.toDate()).toLocaleDateString()}</small><br>
          <button class="completar" data-id="${doc.id}">${objetivo.completado ? 'Reactivar' : 'Completar'}</button>
          <button class="borrar" data-id="${doc.id}">Eliminar</button>
        `;
        objetivoLista.appendChild(item);
      });

      // Eventos: completar o eliminar
      document.querySelectorAll(".completar").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const actual = objetivosRef.doc(id);
          actual.get().then(doc => {
            actual.update({ completado: !doc.data().completado });
          });
        });
      });

      document.querySelectorAll(".borrar").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          objetivosRef.doc(id).delete();
        });
      });
    });
  }

  // Guardar nueva meta
  objetivoForm.addEventListener("submit", e => {
    e.preventDefault();

    const titulo = objetivoForm["titulo-objetivo"].value;
    const descripcion = objetivoForm["descripcion-objetivo"].value;
    const fecha = new Date(objetivoForm["fecha-objetivo"].value);

    if (titulo && descripcion && fecha) {
      objetivosRef.add({
        titulo,
        descripcion,
        fecha,
        completado: false
      }).then(() => {
        objetivoForm.reset();
      });
    }
  });

  cargarObjetivos();
});
