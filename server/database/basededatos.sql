CREATE DATABASE tp_backend;
USE tp_backend;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45),
    password VARCHAR(200),
    email VARCHAR(200),
    isActive BOOLEAN,
    rol VARCHAR(20)
);

-- Tabla Productos
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100),
    precio VARCHAR(100),
    descripcion VARCHAR(200)
);

-- Tabla Contacto
CREATE TABLE Contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_contacto VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefono VARCHAR(20),
    consulta VARCHAR(200)
);
