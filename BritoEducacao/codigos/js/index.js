function expandirDiv() {
    var suporteDiv = document.getElementById("suporte");
    suporteDiv.classList.toggle("expandido");
    var whatsappLink = document.getElementById("whatsappLink");
    whatsappLink.style.display = suporteDiv.classList.contains("expandido") ? "block" : "none";
}

function reverterDiv() {
    var suporteDiv = document.getElementById("suporte");
    suporteDiv.classList.remove("expandido");
    var whatsappLink = document.getElementById("whatsappLink");
    whatsappLink.style.display = "none";
}
