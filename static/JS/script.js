function abrirModal(elemento) {
    console.log("clicou no prontuário");

    let linha = elemento.closest("tr");
    let colunas = linha.querySelectorAll("td");

    let dados = {
        prontuario: colunas[0].innerText,
        terapeuta: colunas[1].innerText,
        nome: colunas[2].innerText,
        nome_social: colunas[3].innerText,
        cns: colunas[4].innerText,
        rg: colunas[5].innerText,
        cpf: colunas[6].innerText,
        nascimento: colunas[9].innerText
    };

    document.getElementById('conteudoPaciente').innerHTML = `
        <label>Prontuário:</label>
        <input value="${dados.prontuario}" readonly>

        <label>Nome:</label>
        <input value="${dados.nome}" readonly>

        <label>CPF:</label>
        <input value="${dados.cpf}" readonly>

        <label>CNS:</label>
        <input value="${dados.cns}" readonly>

        <label>Data Nascimento:</label>
        <input value="${dados.nascimento}" readonly>
    `;

    let modal = document.getElementById('modalPaciente');
    modal.style.display = 'block';
}

function habilitarEdicao() {
    // libera inputs
    document.querySelectorAll('#conteudoPaciente input').forEach(input => {
        input.removeAttribute('readonly');
    });

    // mostra botão salvar
    document.getElementById('btnSalvar').style.display = 'inline-block';

    // opcional: esconde editar
    document.getElementById('btnEditar').style.display = 'none';
}

function salvarEdicao() {
    let dados = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        nascimento: document.getElementById('nascimento').value,
        telefone: document.getElementById('telefone').value
    };

    fetch('/atualizar_paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.mensagem);

        // fecha modal
        fecharModal();

        // recarrega tabela
        location.reload();
    });
}

function fecharModal() {
    document.getElementById('modalPaciente').style.display = 'none';
}