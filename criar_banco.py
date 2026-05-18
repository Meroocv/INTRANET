import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS pacientes (
    prontuario TEXT PRIMARY KEY,
    terapeuta_referencia TEXT,
    nome_paciente TEXT,
    nome_social TEXT,
    cns_paciente TEXT,
    rg TEXT,
    cpf TEXT,
    naturalidade TEXT,
    sexo TEXT,
    data_nascimento TEXT,
    raca_cor TEXT,
    etnia TEXT,
    orientacao_religiosa TEXT,
    escolaridade TEXT,
    nome_mae TEXT,
    nome_pai TEXT,
    nome_responsavel TEXT,
    grau_parentesco_responsavel TEXT,
    telefone_responsavel TEXT,
    municipio TEXT,
    uf TEXT,
    zona TEXT,
    cep TEXT,
    bairro TEXT,
    tipo TEXT,
    logradouro TEXT,
    numero TEXT,
    complemento TEXT,
    ddd TEXT,
    telefone TEXT,
    data_admissao TEXT,
    origem_paciente TEXT,
    especificacao_origem TEXT,
    cnes_usf TEXT,
    cid TEXT,
    status TEXT,
    data_conclusao TEXT
);
""")

conn.commit()
conn.close()

print("Banco de dados criado com sucesso!")