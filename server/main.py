import mysql.connector
from mysql.connector import Error
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

#Funcion donde se realiza la conexion a la bd en la nube
def get_connection():
    try:
        conn = mysql.connector.connect(
            host="roundhouse.proxy.rlwy.net",
            port=37450,
            username="root",
            password="xogIEKdxSUdUVOCeVmJIHFPijmCvmbnO",
            database="railway"
        )
        return conn
    except Error as e:
        print(f"Error al conectar a la base de datos MySQL: {e}")
        raise

### Funciones de REGISTRO Y LOGIN para iniciar sesion
#Ruta para registrar un usuario
@app.route("/usuario/registro", methods=["POST"])
def registro():
    try:
        user_data = request.json
        nombre = user_data["nombre"]
        email = user_data["email"]
        password = user_data["password"]
        isActive = True
        rol = "Usuario"

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        #Verifico si el email ya existe
        cursor.execute("SELECT * FROM Usuarios WHERE email = %(email)s", {"email": email})
        usuario_existente = cursor.fetchone()
        if usuario_existente:
            cursor.close()
            conn.close()
            return jsonify({"msg": "El correo ya está registrado"}), 400

        # Insertar el nuevo usuario
        query = """
        INSERT INTO Usuarios (nombre, email, password, isActive, rol)
        VALUES (%(nombre)s, %(email)s, %(password)s, %(isActive)s, %(rol)s)
        """
        cursor.execute(query, {"nombre": nombre, "email": email, "password": password, "isActive": isActive, "rol": rol})
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Usuario registrado correctamente"}), 201
    except (Error, KeyError) as e:
        print(f"Error al registrar un usuario: {e}")
        return jsonify({"msg": "Error al registrar un usuario"}), 500

#Ruta para login
@app.route("/usuario/login", methods=["POST"])
def login():
    try:
        user_data = request.json
        email = user_data["email"]
        password = user_data["password"]

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Usuarios WHERE email = %(email)s AND password = %(password)s", {"email": email, "password": password})
        usuario = cursor.fetchone()
        cursor.close()
        conn.close()

        if usuario:
            return jsonify({"msg": "Inicio de sesión exitoso"}), 200
        else:
            return jsonify({"msg": "Correo o contraseña incorrectos"}), 401
    except Error as e:
        print(f"Error al iniciar sesión: {e}")
        return jsonify({"msg": "Error al iniciar sesión"}), 500

## Funciones del CRUD para productos
# Ruta para obtener todos los productos
@app.route("/productos/todos", methods=["GET"])
def all_productos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Productos")
        productos = cursor.fetchall()
        print(productos)
        cursor.close()
        conn.close()
        return jsonify(productos)
    except Error as e:
        print(f"Error al obtener todos los productos: {e}")
        return jsonify({"msg": "Error al obtener todos los productos"}), 500

# Ruta para crear un producto
@app.route("/productos/crear", methods=["POST"])
def crear_producto():
    try:
        product_data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
        INSERT INTO Productos (nombre_producto, precio, descripcion, tipo)
        VALUES (%(nombre_producto)s, %(precio)s, %(descripcion)s, %(tipo)s)
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
        SET nombre_producto = %(nombre_producto)s, precio = %(precio)s, descripcion = %(descripcion)s, tipo = %(tipo)s
        WHERE id = %(id)s
        """
        cursor.execute(query, {
            "nombre_producto": product_data["nombre_producto"],
            "precio": product_data["precio"],
            "descripcion": product_data["descripcion"],
            "tipo": product_data["tipo"],
            "id": producto_id
        })
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Producto actualizado correctamente"}), 200
    except (Error, KeyError) as e:
        print(f"Error al actualizar el producto por ID: {e}")
        conn.rollback()
        return jsonify({"msg": "Error al actualizar el producto"}), 500

#Ruta para crear un contacto
@app.route("/contacto/crear", methods=["POST"])
def create_contacto():
    try:
        contact_data = request.json
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
        INSERT INTO Contacto (nombre_contacto, email, telefono, consulta)
        VALUES (%(nombre_contacto)s, %(email)s, %(telefono)s, %(consulta)s)
        """
        cursor.execute(query, contact_data)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"msg": "Contacto creado correctamente"}), 201
    except (Error, KeyError) as e:
        print(f"Error al crear un contacto: {e}")
        return jsonify({"msg": "Error al crear un contacto"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
