import express from 'express';

const app = express();
//configurar a aplicação para receber os dados do formulário
app.use(express.urlencoded({ extended: true }));
const porta = 3000;
const host = 'localhost';//ip de todas as interfaces (placas de rede do pc)

var listaClientes = [];

function cadastrarClienteView(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Cliente</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <style>
                .error-message {
                    color: red;
                    font-size: 0.9em;
                }
                .form-control.is-invalid {
                    border-color: red;
                }
            </style>
        </head>
        <body>
            <div class="container mt-5">
                <h1>Cadastro de Cliente</h1>
                <form id="formCadastro" action="/cadastrarCliente" method="POST" novalidate>
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome Completo</label>
                        <input type="text" class="form-control" id="nome" name="nome" placeholder="Informe seu nome completo">
                        <span class="error-message" id="erroNome"></span>
                    </div>
                    <div class="mb-3">
                        <label for="cpf" class="form-label">CPF</label>
                        <input type="text" class="form-control" id="cpf" name="cpf" placeholder="000.000.000-00">
                        <span class="error-message" id="erroCpf"></span>
                    </div>
                    <div class="mb-3">
                        <label for="nascimento" class="form-label">Data de Nascimento</label>
                        <input type="date" class="form-control" id="nascimento" name="nascimento">
                        <span class="error-message" id="erroNascimento"></span>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="exemplo@dominio.com">
                        <span class="error-message" id="erroEmail"></span>
                    </div>
                    <div class="mb-3">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="telefone" name="telefone" placeholder="(99) 99999-9999">
                        <span class="error-message" id="erroTelefone"></span>
                    </div>
                    <div class="mb-3">
                        <label for="genero" class="form-label">Gênero</label>
                        <select class="form-select" id="genero" name="genero">
                            <option value="">Selecione</option>
                            <option>Masculino</option>
                            <option>Feminino</option>
                            <option>Outro</option>
                        </select>
                        <span class="error-message" id="erroGenero"></span>
                    </div>
                    <div class="mb-3">
                        <label for="observacoes" class="form-label">Observações</label>
                        <textarea class="form-control" id="observacoes" name="observacoes" rows="4" placeholder="Insira qualquer observação adicional aqui"></textarea>
                        <span class="error-message" id="erroObservacoes"></span>
                    </div>
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </form>
            </div>
            <script>
                document.getElementById('formCadastro').addEventListener('submit', function(event) {
                    let isValid = true;

                    // Limpar mensagens de erro e classes
                    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                    document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));

                    // Validação de campos
                    if (!document.getElementById('nome').value.trim()) {
                        document.getElementById('erroNome').textContent = 'Por favor, preencha o nome completo!';
                        document.getElementById('nome').classList.add('is-invalid');
                        isValid = false;
                    }
                    if (!document.getElementById('cpf').value.trim()) {
                        document.getElementById('erroCpf').textContent = 'Por favor, preencha o CPF!';
                        document.getElementById('cpf').classList.add('is-invalid');
                        isValid = false;
                    }
                    if (!document.getElementById('nascimento').value.trim()) {
                        document.getElementById('erroNascimento').textContent = 'Por favor, preencha a data de nascimento!';
                        document.getElementById('nascimento').classList.add('is-invalid');
                        isValid = false;
                    }
                    if (!document.getElementById('email').value.trim()) {
                        document.getElementById('erroEmail').textContent = 'Por favor, preencha o e-mail!';
                        document.getElementById('email').classList.add('is-invalid');
                        isValid = false;
                    }
                    if (!document.getElementById('telefone').value.trim()) {
                        document.getElementById('erroTelefone').textContent = 'Por favor, preencha o telefone!';
                        document.getElementById('telefone').classList.add('is-invalid');
                        isValid = false;
                    }
                    if (!document.getElementById('genero').value.trim()) {
                        document.getElementById('erroGenero').textContent = 'Por favor, selecione um gênero!';
                        document.getElementById('genero').classList.add('is-invalid');
                        isValid = false;
                    }
                    if (!document.getElementById('observacoes').value.trim()) {
                        document.getElementById('erroObservacoes').textContent = 'Por favor, preencha as observações!';
                        document.getElementById('observacoes').classList.add('is-invalid');
                        isValid = false;
                    }

                    // Impedir envio do formulário se inválido
                    if (!isValid) {
                        event.preventDefault();
                    }
                });
            </script>
        </body>
        </html>
    `);
}

function menuCliente(req,resp){
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Cliente</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Menu Principal</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/cadastrarCliente">Cadastro de Clientes</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</html> `
    )
}

function cadastrarCliente(req,resp){
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const nascimento = req.body.nascimento;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const genero = req.body.genero;
    const observacoes = req.body.observacoes;

    const cliente = { nome, cpf, nascimento, email, telefone, genero, observacoes };
    listaClientes.push(cliente);

    listaClientes.push();
   
    resp.write(`   
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Cliente</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">CPF</th>
      <th scope="col">Nascimento</th>
      <th scope="col">E-mail</th>
      <th scope="col">Telefone</th>
      <th scope="col">Genero</th>
      <th scope="col">Observações</th>
    </tr>
  </thead>
  <tbody>`);

  for (var i = 0; i < listaClientes.length; i++){
    resp.write(`<tr>
                <td>${listaClientes[i].nome}</td>
                <td>${listaClientes[i].cpf}</td>
                <td>${listaClientes[i].nascimento}</td>
                <td>${listaClientes[i].email}</td>
                <td>${listaClientes[i].telefone}</td>
                <td>${listaClientes[i].genero}</td>
                <td>${listaClientes[i].observacoes}</td>
                </tr>
        `)
  }

  resp.write(`
        </tbody>
        </table>
        <a class="btn btn-dark" href="/cadastrarCliente" role="button">Continuar cadastrando</a>
        <a class="btn btn-dark" href="/" role="button">Voltar para o menu</a>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
  `);

resp.end();

}

app.get('/',menuCliente);
app.get('/cadastrarCliente', cadastrarClienteView);//enviar o formulario
app.post('/cadastrarCliente',cadastrarCliente)

app.listen(porta, host, () => {
    console.log('Servidor iniciado e em execução no endereço http://localhost:3000');
})