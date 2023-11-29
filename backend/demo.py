import sqlite3
import json

conn = sqlite3.connect('products.db')
cursor = conn.cursor()

with open('products.json', 'r') as file:
    products = json.load(file)

for item in products:
    cursor.execute("INSERT INTO items (id, title, price, description, category, image) VALUES (?, ?, ?, ?, ?, ?)",
                   (item["id"], item["title"], item["price"], item["description"], item["category"], item["image"]))

conn.commit()
conn.close()
