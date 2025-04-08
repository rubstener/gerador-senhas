const alfabeto = "abcdefghijklmnopqrstuvwxyzyw";
const especiais = "!@#$%&*()_-+=[]{}:;<>?/|~^`";

function posicaoAlfabeto(letra) {
  return alfabeto.indexOf(letra.toLowerCase()) + 1;
}

function gerarSenha() {
  const nome = document.getElementById("nome").value.toLowerCase();
  const tipo = document.getElementById("tipo").value;
  const tamanho = parseInt(document.getElementById("tamanho").value);
  const usarMaiusculas = document.getElementById("maiusculas").checked;

  if (!nome || tamanho < 4) {
    alert("Informe um nome válido e tamanho mínimo de 4.");
    return;
  }

  let senha = [];

  senha.push(randomLetra(nome)); // minúscula
  if (usarMaiusculas) senha.push(randomLetra(nome).toUpperCase());
  senha.push(String(posicaoAlfabeto(randomLetra(nome)) % 10)); // número
  senha.push(especiais[Math.floor(Math.random() * especiais.length)]); // especial

  while (senha.length < tamanho) {
    const letra = randomLetra(nome);
    const pos = posicaoAlfabeto(letra);
    const elementos = [
      letra,
      usarMaiusculas ? letra.toUpperCase() : letra,
      String(pos % 10),
      especiais[pos % especiais.length]
    ];
    senha.push(elementos[Math.floor(Math.random() * elementos.length)]);
  }

  senha = senha.sort(() => Math.random() - 0.5);
  document.getElementById("resultado").value = senha.join('').substring(0, tamanho);
}

function randomLetra(nome) {
  return nome[Math.floor(Math.random() * nome.length)];
}

function copiarSenha() {
  const campo = document.getElementById("resultado");
  campo.select();
  document.execCommand("copy");
  alert("Senha copiada!");
}
