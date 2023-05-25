document.getElementById('fileInput').addEventListener('change', function(e) {
    var files = e.target.files;
    var fileList = document.getElementById('fileList');

    fileList.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
      var listItem = document.createElement('li');
      var link = document.createElement('a');
      link.href = URL.createObjectURL(files[i]);
      link.textContent = files[i].name;
      link.target = "_blank";  // Adiciona o atributo target="_blank"
      listItem.appendChild(link);
      fileList.appendChild(listItem);
    }
  });