
      document.addEventListener("DOMContentLoaded", () => {
  const objetivoForm = document.getElementById("objetivo-form");
  const objetivoLista = document.getElementById("objetivo-lista");

  function obtenerObjetivos() {
    return JSON.parse(localStorage.getItem("objetivos")) || [];
  }

  function guardarObjetivos(objetivos) {
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
  }

  function renderObjetivos() {
    const objetivos = obtenerObjetivos();
    objetivoLista.innerHTML = "";

    objetivos.forEach((obj, index) => {
      const item = document.createElement("div");
      item.className = "objetivo-item";
      item.innerHTML = `
        <h3 class="${obj.completado ? 'completado' : ''}">${obj.titulo}</h3>
        <p>${obj.descripcion}</p>
        <small>Fecha objetivo: ${new Date(obj.fecha).toLocaleDateString()}</small><br>
        <button onclick="completarObjetivo(${index})">${obj.completado ? 'Reactivar' : 'Completar'}</button>
        <button onclick="eliminarObjetivo(${index})">Eliminar</button>
      `;
      objetivoLista.appendChild(item);
    });
  }

  window.completarObjetivo = function(index) {
    const objetivos = obtenerObjetivos();
    objetivos[index].completado = !objetivos[index].completado;
    guardarObjetivos(objetivos);
    renderObjetivos();
  };

  window.eliminarObjetivo = function(index) {
    const objetivos = obtenerObjetivos();
    objetivos.splice(index, 1);
    guardarObjetivos(objetivos);
    renderObjetivos();
  };

  objetivoForm.addEventListener("submit", e => {
    e.preventDefault();
    const titulo = document.getElementById("titulo-objetivo").value;
    const descripcion = document.getElementById("descripcion-objetivo").value;
    const fecha = document.getElementById("fecha-objetivo").value;

    const nuevaMeta = {
      titulo,
      descripcion,
      fecha,
      completado: false
    };

    const objetivos = obtenerObjetivos();
    objetivos.push(nuevaMeta);
    guardarObjetivos(objetivos);
    objetivoForm.reset();
    renderObjetivos();
  });

  renderObjetivos();
});
