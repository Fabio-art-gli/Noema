document.addEventListener("DOMContentLoaded", () => {
  const notaForm = document.getElementById("nota-form");
  const notaLista = document.getElementById("nota-lista");

  function obtenerNotas() {
    return JSON.parse(localStorage.getItem("notas")) || [];
  }

  function guardarNotas(notas) {
    localStorage.setItem("notas", JSON.stringify(notas));
  }

  function renderNotas() {
    const notas = obtenerNotas();
    notaLista.innerHTML = "";

    notas.forEach((nota, index) => {
      const item = document.createElement("div");
      item.className = "nota-item";
      item.innerHTML = `
        <h3>${nota.titulo}</h3>
        <p>${nota.contenido}</p>
        <small>Tipo: ${nota.tipo}</small><br>
        <small>Fecha: ${new Date(nota.fecha).toLocaleString()}</small><br>
        <button onclick="eliminarNota(${index})">Eliminar</button>
      `;
      notaLista.appendChild(item);
    });
  }

  window.eliminarNota = function(index) {
    const notas = obtenerNotas();
    notas.splice(index, 1);
    guardarNotas(notas);
    renderNotas();
  };

  notaForm.addEventListener("submit", e => {
    e.preventDefault();

    const titulo = document.getElementById("titulo-nota").value;
    const contenido = document.getElementById("contenido-nota").value;
    const tipo = document.getElementById("tipo-nota").value;

    if (titulo && contenido) {
      const nuevaNota = {
        titulo,
        contenido,
        tipo,
        fecha: new Date().toISOString()
      };

      const notas = obtenerNotas();
      notas.push(nuevaNota);
      guardarNotas(notas);
      notaForm.reset();
      renderNotas();
    }
  });

  renderNotas();
});
