const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

// Configurações
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = 'token.json'; // Altere o caminho para o local onde você deseja armazenar o token

// Credenciais do OAuth 2.0
const credentials = {
  client_id: 'ed164b4e72cf904cea4e420a55dcdc5bd68508f3',
  client_secret: '101551572382074059165',
  redirect_uris: ['http://localhost/oauth2callback'],
};

// Função para autenticar e fazer o upload do arquivo
function uploadFileToDrive(fileTitle, filePath) {
  // Carrega o token de acesso
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Erro ao carregar o arquivo de credenciais:', err);

    authorize(JSON.parse(content), (auth) => {
      // Cria uma instância do Google Drive
      const drive = google.drive({ version: 'v3', auth });

      // Cria o metadata do arquivo
      const fileMetadata = {
        name: fileTitle,
        mimeType: 'application/pdf',
        parent: '1eIy2dmoszamy-TnrP1xXAAp4vf9_Pr0S'
      };

      // Cria o stream de leitura do arquivo
      const media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath),
      };

      // Faz o upload do arquivo
      drive.files.create(
        {
          resource: fileMetadata,
          media: media,
          fields: 'id',
        },
        (err, file) => {
          if (err) {
            console.error('Ocorreu um erro ao fazer o upload do arquivo:', err);
          } else {
            console.log('Arquivo enviado com sucesso para o Google Drive! ID:', file.data.id);
          }
        }
      );
    });
  });
}

// Função para autorizar o acesso
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

// Função para obter o token de acesso
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Autorize este aplicativo acessando esta URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Digite o código de autorização:', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Erro ao obter o token de acesso:', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error('Erro ao gravar o token de acesso:', err);
        console.log('Token de acesso gravado em', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// Exemplo de uso
const fileTitle = 'exemplo.pdf'; // Título do arquivo a ser enviado
const filePath = 'caminho/para/o/arquivo.pdf'; // Caminho para o arquivo PDF a ser enviado

uploadFileToDrive(fileTitle, filePath);
