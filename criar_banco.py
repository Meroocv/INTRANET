import sqlite3

# Cria (ou conecta) ao banco
conn = sqlite3.connect('database.db')

# Cria o cursor
cursor = conn.cursor()

# Cria a tabela de usuários
cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnes NUMBER NOT NULL,
    name TEXT NOT NULL,
    cbo TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
)
""")

# Salva e fecha
conn.commit()
conn.close()

print("Banco de dados criado com sucesso!")