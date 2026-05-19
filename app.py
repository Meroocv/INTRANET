import re
from flask import Flask, render_template, request, redirect, session, jsonify
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("SELECT prontuario FROM pacientes")
print(cursor.fetchall())

app = Flask(__name__)
app.secret_key = 'um_segredo_bem_forte_123456'

def conectar():
    return sqlite3.connect('database.db', timeout=10)


# 🔐 LOGIN
@app.route('/')
def login():
    return render_template('login.html')


@app.route('/logar', methods=['POST'])
def logar():
    user = request.form.get('cpf')
    senha = request.form.get('senha')

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE cpf=?", (user,))
    usuario = cursor.fetchone()

    conn.close()  # ✅ FECHA CONEXÃO

    if usuario and check_password_hash(usuario[6], senha):
        session['usuario'] = usuario[2]  # nome do usuário
        return redirect('/dashboard')
    else:
        return render_template('login.html', erro="CPF ou senha inválidos")


# 🔒 DASHBOARD PROTEGIDO
@app.route('/dashboard')
def dashboard():
    if 'usuario' not in session:
        return redirect('/')
    
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM pacientes")
    pacientes = cursor.fetchall()

    conn.close()

    return render_template('dashboard.html', pacientes=pacientes, usuario=session['usuario'])

# 👤 PACIENTES
@app.route('/pacientes')
def pacientes():
    if 'usuario' not in session:
        return redirect('/')
    return render_template('pacientes.html')


@app.route('/salvar_paciente', methods=['POST'])
def salvar_paciente():
    if 'usuario' not in session:
        return redirect('/')

    prontuario = request.form.get('prontuario')
    nome = request.form.get('nome')
    cns = request.form.get('cns')
    data_nascimento = request.form.get('data_nascimento')

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO pacientes (prontuario, nome, cns, data_nascimento)
        VALUES (?, ?, ?, ?)
    """, (prontuario, nome, cns, data_nascimento))

    conn.commit()
    conn.close()

    return redirect('/pacientes')


# 📝 CADASTRO
@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')


@app.route('/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    name = request.form.get('name')
    cpf = request.form.get('cpf')
    email = request.form.get('email')
    senha = request.form.get('senha')
    confirmar = request.form.get('confirmar_senha')
    cnes = request.form.get('cnes')
    cbo = request.form.get('cbo')
    if not cbo:
        return render_template('cadastro.html', erro="CBO é obrigatório")

    # ✅ Senhas iguais
    if senha != confirmar:
        return render_template('cadastro.html', erro="As senhas não coincidem")

    # ✅ Regras de senha
    if len(senha) < 6:
        return render_template('cadastro.html', erro="Mínimo 6 caracteres")

    if not re.search(r'[A-Z]', senha):
        return render_template('cadastro.html', erro="Precisa de letra maiúscula")

    if not re.search(r'[a-z]', senha):
        return render_template('cadastro.html', erro="Precisa de letra minúscula")

    if not re.search(r'[0-9]', senha):
        return render_template('cadastro.html', erro="Precisa de número")

    conn = conectar()
    cursor = conn.cursor()

    # ✅ Verificar CPF duplicado
    cursor.execute("SELECT * FROM usuarios WHERE cpf=?", (cpf,))
    if cursor.fetchone():
        conn.close()
        return render_template('cadastro.html', erro="CPF já cadastrado")

    # 🔐 Criptografar senha
    senha_hash = generate_password_hash(senha)

    cursor.execute("""
        INSERT INTO usuarios (name, cpf, email, senha, cnes, cbo)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (name, cpf, email, senha_hash, cnes, cbo))

    conn.commit()
    conn.close()

    return redirect('/')

@app.route('/atendimentos')
def atendimentos():
    if 'usuario' not in session:
        return redirect('/')
    return render_template('atendimentos.html')

# 🚪 LOGOUT
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@app.route('/atualizar_paciente', methods=['POST'])
def atualizar_paciente():
    dados = request.get_json()

    try:
        conn = conectar()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE pacientes
            SET
                terapeuta_referencia=?,
                nome_paciente=?,
                nome_social=?,
                cns_paciente=?,
                rg=?,
                cpf=?,
                naturalidade=?,
                sexo=?,
                data_nascimento=?,
                raca_cor=?,
                etnia=?,
                orientacao_religiosa=?,
                escolaridade=?,
                nome_mae=?,
                nome_pai=?,
                nome_responsavel=?,
                grau_parentesco_responsavel=?,
                telefone_responsavel=?,
                municipio=?,
                uf=?,
                zona=?,
                cep=?,
                bairro=?,
                tipo=?,
                logradouro=?,
                numero=?,
                complemento=?,
                ddd=?,
                telefone=?,
                data_admissao=?,
                origem_paciente=?,
                especificacao_origem=?,
                cnes_usf=?,
                cid=?,
                status=?,
                data_conclusao=?
            WHERE prontuario=?
        """, (
            dados.get('terapeuta_referencia'),
            dados.get('nome_paciente'),
            dados.get('nome_social'),
            dados.get('cns_paciente'),
            dados.get('rg'),
            dados.get('cpf'),
            dados.get('naturalidade'),
            dados.get('sexo'),
            dados.get('data_nascimento'),
            dados.get('raca_cor'),
            dados.get('etnia'),
            dados.get('orientacao_religiosa'),
            dados.get('escolaridade'),
            dados.get('nome_mae'),
            dados.get('nome_pai'),
            dados.get('nome_responsavel'),
            dados.get('grau_parentesco_responsavel'),
            dados.get('telefone_responsavel'),
            dados.get('municipio'),
            dados.get('uf'),
            dados.get('zona'),
            dados.get('cep'),
            dados.get('bairro'),
            dados.get('tipo'),
            dados.get('logradouro'),
            dados.get('numero'),
            dados.get('complemento'),
            dados.get('ddd'),
            dados.get('telefone'),
            dados.get('data_admissao'),
            dados.get('origem_paciente'),
            dados.get('especificacao_origem'),
            dados.get('cnes_usf'),
            dados.get('cid'),
            dados.get('status'),
            dados.get('data_conclusao'),
            dados.get('prontuario')
        ))

        conn.commit()
        conn.close()

        return jsonify({'mensagem': 'Paciente atualizado com sucesso!'})

    except Exception as e:
        print("ERRO UPDATE:", e)
        return jsonify({'erro': str(e)}), 500

@app.route('/buscar_paciente/<prontuario>')
def buscar_paciente(prontuario):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT prontuario, nome_paciente
        FROM pacientes
        WHERE CAST(prontuario AS INTEGER) = ?
        """, (int(prontuario),))

    paciente = cursor.fetchone()
    conn.close()

    if paciente:
        return jsonify({
            "prontuario": paciente[0],
            "nome_paciente": paciente[1]
        })

    return jsonify({"erro": "Paciente não encontrado"}), 404
app.run(debug=True)