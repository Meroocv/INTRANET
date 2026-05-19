function abrirAba(aba) {
    document.querySelectorAll('.aba').forEach(div => {
        div.style.display = 'none';
    });

    document.getElementById(aba).style.display = 'block';
}

function abrirModal(elemento) {
    console.log("clicou no prontuário");

    let linha = elemento.closest("tr");
    let colunas = linha.querySelectorAll("td");

    let dados = {
        prontuario: colunas[0]?.innerText || "",
        terapeuta_referencia: colunas[1]?.innerText || "",
        nome_paciente: colunas[2]?.innerText || "",
        nome_social: colunas[3]?.innerText || "",
        cns_paciente: colunas[4]?.innerText || "",
        rg: colunas[5]?.innerText || "",
        cpf: colunas[6]?.innerText || "",
        naturalidade: colunas[7]?.innerText || "",
        sexo: colunas[8]?.innerText || "",
        data_nascimento: colunas[9]?.innerText || "",
        raca_cor: colunas[10]?.innerText || "",
        etnia: colunas[11]?.innerText || "",
        escolaridade: colunas[13]?.innerText || "",
        nome_mae: colunas[14]?.innerText || "",
        nome_pai: colunas[15]?.innerText || "",
        nome_responsavel: colunas[16]?.innerText || "",
        grau_parentesco_responsavel: colunas[17]?.innerText || "",
        telefone_responsavel: colunas[18]?.innerText || "",
        municipio: colunas[19]?.innerText || "",
        uf: colunas[20]?.innerText || "",
        zona: colunas[21]?.innerText || "",
        cep: colunas[22]?.innerText || "",
        bairro: colunas[23]?.innerText || "",
        tipo: colunas[24]?.innerText || "",
        logradouro: colunas[25]?.innerText || "",
        numero: colunas[26]?.innerText || "",
        complemento: colunas[27]?.innerText || "",
        telefone: colunas[29]?.innerText || "",
        data_admissao: colunas[30]?.innerText || "",
        origem_paciente: colunas[31]?.innerText || "",
        especificacao_origem: colunas[32]?.innerText || "",
        cnes_usf: colunas[33]?.innerText || "",
        cid: colunas[34]?.innerText || "",
        status: colunas[35]?.innerText || "",
        data_conclusao: colunas[36]?.innerText || ""
    };

    // IDENTIFICAÇÃO
    document.getElementById('prontuario').value = dados.prontuario;
    document.getElementById('nome_paciente').value = dados.nome_paciente;
    document.getElementById('nome_social').value = dados.nome_social;
    document.getElementById('cpf').value = dados.cpf;
    document.getElementById('rg').value = dados.rg;
    document.getElementById('cns_paciente').value = dados.cns_paciente;

    // FAMÍLIA
    document.getElementById('nome_mae').value = dados.nome_mae;
    document.getElementById('nome_pai').value = dados.nome_pai;
    document.getElementById('nome_responsavel').value = dados.nome_responsavel;
    document.getElementById('grau_parentesco_responsavel').value = dados.grau_parentesco_responsavel;
    document.getElementById('telefone_responsavel').value = dados.telefone_responsavel;

    // PESSOAL
    document.getElementById('data_nascimento').value = dados.data_nascimento;
    document.getElementById('sexo').value = dados.sexo;
    document.getElementById('naturalidade').value = dados.naturalidade;
    document.getElementById('raca_cor').value = dados.raca_cor;
    document.getElementById('etnia').value = dados.etnia;
    document.getElementById('escolaridade').value = dados.escolaridade;

    // ENDEREÇO
    document.getElementById('municipio').value = dados.municipio;
    document.getElementById('uf').value = dados.uf;
    document.getElementById('cep').value = dados.cep;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('logradouro').value = dados.logradouro;
    document.getElementById('numero').value = dados.numero;
    document.getElementById('complemento').value = dados.complemento;

    // STATUS
    document.getElementById('status').value = dados.status;
    document.getElementById('cid').value = dados.cid;
    document.getElementById('data_admissao').value = dados.data_admissao;
    document.getElementById('data_conclusao').value = dados.data_conclusao;

    // ABRIR MODAL
    document.getElementById('modalPaciente').style.display = 'block';
}
function habilitarEdicao() {

    // pega todos os inputs
    const inputs = document.querySelectorAll('#modalPaciente input');

    // 🔒 primeiro: trava todos
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
    });

    // 🔓 depois: libera apenas os editáveis (exceto prontuário)
    const editaveis = [
        'nome_paciente',
        'nome_social',
        'cpf',
        'rg',
        'cns_paciente',
        'nome_mae',
        'nome_pai',
        'nome_responsavel',
        'grau_parentesco_responsavel',
        'telefone_responsavel',
        'data_nascimento',
        'sexo',
        'naturalidade',
        'raca_cor',
        'escolaridade',
        'etnia',
        'orientacao_religiosa',
        'telefone',
        'municipio',
        'uf',
        'cep',
        'bairro',
        'logradouro',
        'numero',
        'complemento',
        'status',
        'cid',
        'data_admissao',
        'data_conclusao'
    ];

    editaveis.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.removeAttribute('readonly');
    });

    // 🔒 garante que prontuário nunca será editável
    document.getElementById('prontuario').setAttribute('readonly', true);

    // botões
    document.getElementById('btnSalvar').style.display = 'inline-block';
    document.getElementById('btnEditar').style.display = 'none';
}
function salvarEdicao() {
    let dados = {
        prontuario: document.getElementById('prontuario').value,

        // Identificação
        terapeuta_referencia: document.getElementById('terapeuta_referencia')?.value || '',
        nome_paciente: document.getElementById('nome_paciente').value,
        nome_social: document.getElementById('nome_social')?.value || '',
        cns_paciente: document.getElementById('cns_paciente')?.value || '',
        rg: document.getElementById('rg')?.value || '',
        cpf: document.getElementById('cpf').value,

        // Familiares
        nome_mae: document.getElementById('nome_mae')?.value || '',
        nome_pai: document.getElementById('nome_pai')?.value || '',
        nome_responsavel: document.getElementById('nome_responsavel')?.value || '',
        grau_parentesco_responsavel: document.getElementById('grau_parentesco_responsavel')?.value || '',
        telefone_responsavel: document.getElementById('telefone_responsavel')?.value || '',

        // Pessoais
        data_nascimento: document.getElementById('data_nascimento').value,
        sexo: document.getElementById('sexo')?.value || '',
        naturalidade: document.getElementById('naturalidade')?.value || '',
        raca_cor: document.getElementById('raca_cor')?.value || '',
        escolaridade: document.getElementById('escolaridade')?.value || '',
        etnia: document.getElementById('etnia')?.value || '',
        orientacao_religiosa: document.getElementById('orientacao_religiosa')?.value || '',

        // Contato
        telefone: document.getElementById('telefone')?.value || '',

        // Endereço
        municipio: document.getElementById('municipio')?.value || '',
        uf: document.getElementById('uf')?.value || '',
        cep: document.getElementById('cep')?.value || '',
        bairro: document.getElementById('bairro')?.value || '',
        logradouro: document.getElementById('logradouro')?.value || '',
        numero: document.getElementById('numero')?.value || '',
        complemento: document.getElementById('complemento')?.value || '',

        // Status clínico
        status: document.getElementById('status')?.value || '',
        cid: document.getElementById('cid')?.value || '',
        data_admissao: document.getElementById('data_admissao')?.value || '',
        data_conclusao: document.getElementById('data_conclusao')?.value || ''
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
        fecharModal();
        location.reload();
    })
    .catch(err => {
        console.error('Erro ao salvar:', err);
        alert('Erro ao salvar paciente');
    });
}
function fecharModal() {
    document.getElementById('btnSalvar').style.display = 'none';
    document.getElementById('btnEditar').style.display = 'inline-block';
    document.getElementById('modalPaciente').style.display = 'none';

    // esconde todas as abas
    document.querySelectorAll('.aba').forEach(div => {
        div.style.display = 'none';
    });

    // mostra identificação
    document.getElementById('identificacao').style.display = 'block';

    // reseta botão ativo
    document.querySelectorAll('.tabs button').forEach(btn => {
        btn.classList.remove('ativo');
    });

    // ativa primeira aba
    const primeira = document.querySelector('.tabs button');
    if (primeira) primeira.classList.add('ativo');
    document.getElementById('modalPaciente').style.display = 'none';
}

function filtrarTabela() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const tabela = document.getElementById('tabelaPacientes');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 1; i < linhas.length; i++) {
        const celulas = linhas[i].getElementsByTagName('td');
        let encontrou = false;

        for (let j = 0; j < celulas.length; j++) {
            if (celulas[j].textContent.toLowerCase().includes(filtro)) {
                encontrou = true;
                break;
            }
        }

        linhas[i].style.display = encontrou ? '' : 'none';
    }
}

function ordenarTabela(coluna) {
    const tabela = document.getElementById('tabelaPacientes');
    const linhas = Array.from(tabela.getElementsByTagName('tr')).slice(1);
    const indice = ['prontuario', 'terapeuta_referencia', 'nome_paciente', 'nome_social', 'cns_paciente', 'rg', 'cpf', 'naturalidade', 'sexo', 'data_nascimento', 'raca_cor', 'etnia', 'escolaridade', 'nome_mae', 'nome_pai', 'nome_responsavel', 'grau_parentesco_responsavel', 'telefone_responsavel', 'municipio', 'uf', 'zona', 'cep', 'bairro', 'tipo', 'logradouro', 'numero', 'complemento', 'telefone', 'data_admissao', 'origem_paciente', 'especificacao_origem', 'cnes_usf', 'cid', 'status', 'data_conclusao'].indexOf(coluna);
}

function buscarPaciente() {
    let prontuario = document.getElementById('prontuario').value.trim();

    if (!prontuario) return;

    fetch(`/buscar_paciente/${prontuario}`)
        .then(res => {
            if (!res.ok) throw new Error("Paciente não encontrado");
            return res.json();
        })
        .then(data => {
            document.getElementById('nome_paciente').value = data.nome_paciente;
        })
        .catch(err => {
            console.log(err);
            document.getElementById('nome_paciente').value = "";
            alert("Paciente não encontrado");
        });
}

function inserirAtendimento() {
    const prontuario = document.getElementById('prontuario').value;
    if (!prontuario) {
        alert('Prontuário não encontrado!');
        return;
    }
}