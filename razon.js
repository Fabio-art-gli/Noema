document.addEventListener("DOMContentLoaded", () => {
  const recursoForm = document.getElementById("recurso-form");
  const recursoLista = document.getElementById("recurso-lista");

  function obtenerRecursos() {
    return JSON.parse(localStorage.getItem("recursosRazon")) || [];
  }

  function guardarRecursos(recursos) {
    localStorage.setItem("recursosRazon", JSON.stringify(recursos));
  }

  function renderRecursos() {
    const recursos = obtenerRecursos();
    recursoLista.innerHTML = "";

    recursos.forEach((recurso, index) => {
      const item = document.createElement("div");
      item.className = "recurso-item";
      item.innerHTML = `
        <h3>${recurso.titulo}</h3>
        <p><strong>Tema:</strong> ${recurso.tema} | <strong>Tipo:</strong> ${recurso.tipo}</p>
        <p>${recurso.descripcion}</p>
        <a href="${recurso.enlace}" target="_blank">Ver recurso</a><br>
        <button onclick="eliminarRecurso(${index})">Eliminar</button>
      `;
      recursoLista.appendChild(item);
    });
  }

  window.eliminarRecurso = function(index) {
    const recursos = obtenerRecursos();
    recursos.splice(index, 1);
    guardarRecursos(recursos);
    renderRecursos();
  };

  recursoForm.addEventListener("submit", e => {
    e.preventDefault();

    const titulo = document.getElementById("titulo-recurso").value;
    const tipo = document.getElementById("tipo-recurso").value;
    const tema = document.getElementById("tema-recurso").value;
    const enlace = document.getElementById("enlace-recurso").value;
    const descripcion = document.getElementById("descripcion-recurso").value;

    const nuevoRecurso = {
      titulo,
      tipo,
      tema,
      enlace,
      descripcion
    };

    const recursos = obtenerRecursos();
    recursos.push(nuevoRecurso);
    guardarRecursos(recursos);
    recursoForm.reset();
    renderRecursos();
  });

  renderRecursos();
});
