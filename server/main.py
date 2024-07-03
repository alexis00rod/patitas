import mysql.connector
from mysql.connector import Error
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

#Holaa

# Función para obtener la conexión a MySQL
def get_connection():
    try:
        conn = mysql.connector.connect(
            host="roundhouse.proxy.rlwy.net",
            port=37450,
            user="root",
            password="xogIEKdxSUdUVOCeVmJIHFPijmCvmbnO",
            database="railway"
        )
        return conn
    except Error as e:
        print(f"Error al conectar a la base de datos MySQL: {e}")
        raise

# Ruta para obtener todos los productos
@app.route("/productos/todos", methods=["GET"])
def get_all_productos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Productos")
        productos = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(productos)
    except Error as e:
        print(f"Error al obtener todos los productos: {e}")
        return jsonify({"msg": "Error al obtener todos los productos"}), 500

# Ruta para crear un producto
@app.route("/productos/crear", methods=["POST"])
def post_crear_producto():
    try:
        product_data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
        INSERT INTO Productos (nombre_producto, precio, descripcion)
        VALUES (%(nombre_producto)s, %(precio)s, %(descripcion)s)
        """
        cursor.execute(query, product_data)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Producto creado correctamente"}), 201
    except (Error, KeyError) as e:
        print(f"Error al crear un producto: {e}")
        return jsonify({"msg": "Error al crear un producto"}), 500

# Ruta para obtener un producto por su ID
@app.route("/producto/<producto_id>", methods=["GET"])
def get_producto(producto_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Productos WHERE id = %(id)s", {"id": producto_id})
        producto = cursor.fetchone()
        cursor.close()
        conn.close()
        if producto:
            return jsonify(producto)
        else:
            return jsonify({"msg": "Producto no encontrado"}), 404
    except Error as e:
        print(f"Error al obtener el producto por ID: {e}")
        return jsonify({"msg": "Error al obtener el producto"}), 500

# Ruta para eliminar un producto por su ID
@app.route("/producto/eliminar/<producto_id>", methods=["DELETE"])
def delete_producto(producto_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Productos WHERE id = %(id)s", {"id": producto_id})
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Producto eliminado correctamente"}), 200
    except Error as e:
        print(f"Error al eliminar el producto por ID: {e}")
        conn.rollback()
        return jsonify({"msg": "Error al eliminar el producto"}), 500

# Ruta para actualizar un producto por su ID
@app.route("/producto/actualizar/<producto_id>", methods=["PATCH"])
def update_producto(producto_id):
    try:
        product_data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
        UPDATE Productos
        SET nombre_producto = %(nombre_producto)s, precio = %(precio)s, descripcion = %(descripcion)s
        WHERE id = %(id)s
        """
        cursor.execute(query, {"nombre_producto": product_data["nombre_producto"], "precio": product_data["precio"], "descripcion": product_data["descripcion"], "id": producto_id})
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Producto actualizado correctamente"}), 200
    except (Error, KeyError) as e:
        print(f"Error al actualizar el producto por ID: {e}")
        conn.rollback()
        return jsonify({"msg": "Error al actualizar el producto"}), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 37450))
    app.run(host='0.0.0.0', port=port, debug=True)
