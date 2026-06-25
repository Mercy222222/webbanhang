import sqlite3
import json

conn = sqlite3.connect('C:/Users/trkie/AppData/Roaming/9router/db/data.sqlite')
cur = conn.cursor()

try:
    cur.execute("SELECT * FROM settings;")
    print("Settings:", cur.fetchall())
except Exception as e:
    pass

try:
    cur.execute("SELECT * FROM kv;")
    print("KV:", cur.fetchall())
except Exception as e:
    pass
