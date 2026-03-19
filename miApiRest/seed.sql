-- ==========================================
-- SCRIPT DE SEED PARA MARIADB
-- BD: braroapirest
-- ==========================================

SET NAMES utf8mb4;
USE `braroapirest`;

START TRANSACTION;

-- ==========================================
-- LIMPIAR TABLAS (ORDEN POR FK)
-- ==========================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `tbDetalleFactura`;
TRUNCATE TABLE `tbFacturas`;
TRUNCATE TABLE `tbProductos`;
TRUNCATE TABLE `tbClientes`;
TRUNCATE TABLE `tbCategorias`;
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- INSERTAR CATEGORIAS
-- ==========================================
INSERT INTO `tbCategorias` (`id`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'Computadoras', 'Laptops, desktops y computadoras portátiles', 1),
(2, 'Periféricos', 'Mouses, teclados, webcams y otros periféricos', 1),
(3, 'Monitores', 'Pantallas y monitores de diferentes tamaños', 1),
(4, 'Cables y Accesorios', 'Cables HDMI, adaptadores y accesorios', 1),
(5, 'Audio', 'Auriculares, parlantes y equipos de audio', 1),
(6, 'Almacenamiento', 'Discos duros y dispositivos de almacenamiento', 1);

-- ==========================================
-- INSERTAR CLIENTES
-- ==========================================
INSERT INTO `tbClientes` (`id`, `nombre`, `apellido1`, `apellido2`, `email`, `telefono`, `estado`) VALUES
('001001001', 'Juan', 'García', 'López', 'juan.garcia@email.com', '88112345', 1),
('002002002', 'María', 'Rodríguez', 'Sánchez', 'maria.rodriguez@email.com', '88123456', 1),
('003003003', 'Carlos', 'Martínez', 'Fernández', 'carlos.martinez@email.com', '88134567', 1),
('004004004', 'Ana', 'López', 'González', 'ana.lopez@email.com', '88145678', 1),
('005005005', 'Pedro', 'Hernández', 'Ruiz', 'pedro.hernandez@email.com', '88156789', 1);

-- ==========================================
-- INSERTAR PRODUCTOS
-- ==========================================
INSERT INTO `tbProductos` (`id`, `idCategoria`, `nombre`, `precio`, `stock`, `estado`, `fechaCreacion`, `fechaActualizacion`) VALUES
(1, 1, 'Laptop HP', 799.99, 10, 1, NOW(), NOW()),
(2, 2, 'Mouse Inalámbrico', 25.50, 50, 1, NOW(), NOW()),
(3, 2, 'Teclado Mecánico', 89.99, 30, 1, NOW(), NOW()),
(4, 3, 'Monitor 27"', 299.99, 15, 1, NOW(), NOW()),
(5, 4, 'Cable HDMI', 12.99, 100, 1, NOW(), NOW()),
(6, 2, 'Webcam HD', 59.99, 20, 1, NOW(), NOW()),
(7, 5, 'Auriculares Bluetooth', 79.99, 25, 1, NOW(), NOW()),
(8, 6, 'Disco Duro Externo', 120.00, 12, 1, NOW(), NOW());

-- ==========================================
-- INSERTAR FACTURAS
-- ==========================================
INSERT INTO `tbFacturas` (`id`, `idCliente`, `fecha`, `subTotalFact`, `impuestoAPagar`, `total`, `estado`) VALUES
(1, '001001001', '2026-02-15', 901.99, 117.26, 1019.25, 1),
(2, '002002002', '2026-02-16', 414.74, 53.92, 468.66, 1),
(3, '003003003', '2026-02-17', 779.94, 101.39, 881.33, 1),
(4, '004004004', '2026-02-18', 180.42, 23.45, 203.87, 1),
(5, '005005005', '2026-02-19', 1129.94, 146.89, 1276.83, 1);

-- ==========================================
-- INSERTAR DETALLES DE FACTURAS
-- ==========================================
INSERT INTO `tbDetalleFactura` (`idFactura`, `idProducto`, `cantidad`, `precioUnitario`, `subTotalDet`) VALUES
-- Factura 1
(1, 1, 1, 799.99, 799.99),
(1, 2, 4, 25.50, 102.00),

-- Factura 2
(2, 3, 1, 89.99, 89.99),
(2, 5, 25, 12.99, 324.75),

-- Factura 3
(3, 4, 1, 299.99, 299.99),
(3, 6, 2, 59.99, 119.98),
(3, 7, 3, 79.99, 239.97),
(3, 8, 1, 120.00, 120.00),

-- Factura 4
(4, 2, 3, 25.50, 76.50),
(4, 5, 8, 12.99, 103.92),

-- Factura 5
(5, 3, 1, 89.99, 89.99),
(5, 6, 4, 59.99, 239.96),
(5, 7, 1, 79.99, 79.99),
(5, 1, 1, 799.99, 799.99);

COMMIT;

-- ==========================================
-- VERIFICAR DATOS INSERTADOS
-- ==========================================
-- SELECT * FROM `tbCategorias`;
-- SELECT * FROM `tbClientes`;
-- SELECT * FROM `tbProductos`;
-- SELECT * FROM `tbFacturas`;
-- SELECT * FROM `tbDetalleFactura`;
