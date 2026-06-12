import sqlite3
import json

conn = sqlite3.connect('C:/Users/trkie/AppData/Roaming/9router/db/data.sqlite')
cur = conn.cursor()
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cur.fetchall())

try:
    cur.execute("SELECT * FROM AntigravityRoute LIMIT 10;")
    print("Routes:", cur.fetchall())
except Exception as e:
    print(e)

try:
    cur.execute("SELECT * FROM routes LIMIT 10;")
    print("routes:", cur.fetchall())
except Exception as e:
    print(e)
