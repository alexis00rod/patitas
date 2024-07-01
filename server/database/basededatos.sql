CREATE DATABASE tp_backend;
USE tp_backend;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id VARCHAR(200) PRIMARY KEY,
    nombre VARCHAR(45),
    password VARCHAR(200),
    email VARCHAR(200),
    isActive BOOLEAN,
    rol VARCHAR(20)
);

-- Tabla Productos
CREATE TABLE Productos (
    id VARCHAR(200) PRIMARY KEY,
    nombre_producto VARCHAR(100),
    precio VARCHAR(100),
    descripcion VARCHAR(200)
);

-- Tabla Servicios
CREATE TABLE Servicios (
    id VARCHAR(200) PRIMARY KEY,
    nombre_servicio VARCHAR(15),
    descripcion VARCHAR(200)
);
