// Função de inicialização da API do Google Drive
function init() {
    gapi.client.init({
      apiKey: '664b65936dfe3259149b94077a60b604a6131d6e',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      clientId: '108527723436605870204',
      scope: 'https://www.googleapis.com/auth/drive.readonly'
    }).then(function() {
      // Após a inicialização da API, faça a chamada para obter a lista de pastas
      getFolders();
    }, function(error) {
      console.log('Erro ao inicializar a API do Google Drive:', error);
    });
  }
  
  // Função para obter a lista de pastas do Google Drive
  function getFolders() {
    gapi.client.drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder'"
    }).then(function(response) {
      var folders = response.result.files;
      
      // Itera pelas pastas e exibe os links com os nomes
      folders.forEach(function(folder) {
        var link = document.createElement('a');
        link.href = 'https://drive.google.com/drive/folders/' + folder.id;
        link.textContent = folder.name;
        
        document.body.appendChild(link);
        document.body.appendChild(document.createElement('br'));
      });
    }, function(error) {
      console.log('Erro ao obter a lista de pastas:', error);
    });
  }
  
  // Carrega a API do Google Drive
  gapi.load('client', init);
  