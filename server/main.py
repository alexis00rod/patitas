from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)

#Conexion a la base de datos de railway
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
    except mysql.connector.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        raise

# Ruta para obtener todos los productos
@app.get("/productos/todos")
def get_AllProductos():
    try:
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
        cursor.execute("SELECT * FROM Productos")
        productos = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(productos)
    except psycopg2.Error as e:
        print(f"Error al obtener todos los productos: {e}")
        return jsonify({"msg": "Error al obtener todos los productos"}), 500

# Ruta para crear un producto
@app.post("/productos/crear")
def post_crearProductos():
    try:
        product_data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
        query = """
        INSERT INTO Productos (nombre_producto, precio, descripcion)
        VALUES (%s, %s, %s)
        RETURNING *
        """
        cursor.execute(query, (
            product_data["nombre_producto"],
            product_data["precio"],
            product_data["descripcion"]
        ))
        producto = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify(producto), 201
    except (psycopg2.Error, KeyError) as e:
        print(f"Error al crear un producto: {e}")
        return jsonify({"msg": "Error al crear un producto"}), 500

# Ruta para obtener un producto por su ID
@app.get("/producto/<producto_id>")
def get_Producto(producto_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
        cursor.execute("SELECT * FROM Productos WHERE id = %s", (producto_id,))
        producto = cursor.fetchone()
        cursor.close()
        conn.close()
        if producto:
            return jsonify(producto)
        else:
            return jsonify({"msg": "Producto no encontrado"}), 404
    except psycopg2.Error as e:
        print(f"Error al obtener el producto por ID: {e}")
        return jsonify({"msg": "Error al obtener el producto"}), 500

# Ruta para eliminar un producto por su ID
@app.delete("/producto/eliminar/<producto_id>")
def delete_Producto(producto_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Productos WHERE id = %s", (producto_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Producto eliminado correctamente"}), 200
    except psycopg2.Error as e:
        print(f"Error al eliminar el producto por ID: {e}")
        conn.rollback()
        return jsonify({"msg": "Error al eliminar el producto"}), 500

# Ruta para actualizar un producto por su ID
@app.patch("/producto/actualizar/<producto_id>")
def update_Producto(producto_id):
    try:
        product_data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
        cursor.execute(
            """
            UPDATE Productos
            SET nombre_producto = %s, precio = %s, descripcion = %s
            WHERE id = %s
            RETURNING *
            """,
            (
                product_data["nombre_productos"],
                product_data["precio"],
                product_data["descripcion"],
                producto_id
            ),
        )
        producto = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        if producto:
            return jsonify(producto), 200
        else:
            return jsonify({"msg": "Producto no encontrado"}), 404
    except (psycopg2.Error, KeyError) as e:
        print(f"Error al actualizar el producto por ID: {e}")
        conn.rollback()
        return jsonify({"msg": "Error al actualizar el producto"}), 500

if __name__ == "__main__":
    app.run(debug=True)