import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

pacientes = [
    ("001", "Dr. João", "Maria Silva", "Maria S.", "123456789", "MG123456", "11111111111", "Belo Horizonte", "F", "1990-05-10", "Branca", "Não", "Católica", "Superior", "Ana Silva", "Carlos Silva", "José Silva", "Pai", "31999999999", "Belo Horizonte", "MG", "Urbana", "30000000", "Centro", "Rua", "Av. Afonso Pena", "100", "Apto 101", "31", "988888888", "2023-01-01", "UBS", "Encaminhamento médico", "1234567", "F32", "EM ACOMPANHAMENTO", ""),
    
    ("002", "Dra. Carla", "João Souza", "", "987654321", "SP654321", "22222222222", "São Paulo", "M", "1985-08-20", "Parda", "Não", "Evangélico", "Médio", "Maria Souza", "Pedro Souza", "", "", "", "São Paulo", "SP", "Urbana", "01000000", "Centro", "Rua", "Rua Augusta", "200", "", "11", "977777777", "2023-02-10", "Demanda espontânea", "", "7654321", "F41", "ALTA", "2023-06-01"),

    ("003", "Dr. Lucas", "Ana Costa", "Ana C.", "456123789", "RJ112233", "33333333333", "Rio de Janeiro", "F", "2000-12-01", "Preta", "Não", "Sem religião", "Superior", "Clara Costa", "", "Marcos Costa", "Irmão", "21999999999", "Rio de Janeiro", "RJ", "Urbana", "20000000", "Copacabana", "Rua", "Rua Atlântica", "300", "", "21", "966666666", "2023-03-15", "CAPS", "", "9988776", "F20", "EM AVALIAÇÃO", "")
]

cursor.executemany("""
INSERT INTO pacientes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", pacientes)

conn.commit()
conn.close()

print("Pacientes fictícios inseridos com sucesso!")