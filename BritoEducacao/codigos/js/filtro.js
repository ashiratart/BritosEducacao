function filtrar() {
    // Obtém o valor digitado no campo de pesquisa
    var filtro = document.getElementById("filtro").value.toUpperCase();

    // Obtém todos os títulos dentro da div
    var titulos = document.getElementById("minhaDiv").getElementsByTagName("h2");

    // Itera sobre os títulos e mostra ou oculta de acordo com o filtro
    for (var i = 0; i < titulos.length; i++) {
      var titulo = titulos[i];
      var texto = titulo.innerText || titulo.textContent;
      if (texto.toUpperCase().indexOf(filtro) > -1) {
        titulo.style.display = "";
      } else {
        titulo.style.display = "none";
      }
    }
  }

  //<input type="text" id="filtro" onkeyup="filtrar()" placeholder="Pesquisar por título">