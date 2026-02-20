-- ==========================================
-- INSERTAR CATEGORIAS
-- ==========================================
INSERT INTO `tbCategorias` (`id`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'Computadoras', 'Laptops, desktops y computadoras portátiles', true),
(2, 'Periféricos', 'Mouses, teclados, webcams y otros periféricos', true),
(3, 'Monitores', 'Pantallas y monitores de diferentes tamaños', true),
(4, 'Cables y Accesorios', 'Cables HDMI, adaptadores y accesorios', true),
(5, 'Audio', 'Auriculares, parlantes y equipos de audio', true),
(6, 'Almacenamiento', 'Discos duros y dispositivos de almacenamiento', true);

-- ==========================================
-- INSERTAR CLIENTES
-- ==========================================
INSERT INTO `tbClientes` (`id`, `nombre`, `apellido1`, `apellido2`, `email`, `telefono`) VALUES
('001001001', 'Juan', 'García', 'López', 'juan.garcia@email.com', '88112345'),
('002002002', 'María', 'Rodríguez', 'Sánchez', 'maria.rodriguez@email.com', '88123456'),
('003003003', 'Carlos', 'Martínez', 'Fernández', 'carlos.martinez@email.com', '88134567'),
('004004004', 'Ana', 'López', 'González', 'ana.lopez@email.com', '88145678'),
('005005005', 'Pedro', 'Hernández', 'Ruiz', 'pedro.hernandez@email.com', '88156789');

-- ==========================================
-- INSERTAR PRODUCTOS
-- ==========================================
INSERT INTO `tbProductos` (`id`, `idCategoria`, `nombre`, `precio`, `stock`, `estado`, `fechaCreacion`, `fechaActualizacion`) VALUES
(1, 1, 'Laptop HP', 799.99, 10, true, NOW(), NOW()),
(2, 2, 'Mouse Inalámbrico', 25.50, 50, true, NOW(), NOW()),
(3, 2, 'Teclado Mecánico', 89.99, 30, true, NOW(), NOW()),
(4, 3, 'Monitor 27"', 299.99, 15, true, NOW(), NOW()),
(5, 4, 'Cable HDMI', 12.99, 100, true, NOW(), NOW()),
(6, 2, 'Webcam HD', 59.99, 20, true, NOW(), NOW()),
(7, 5, 'Auriculares Bluetooth', 79.99, 25, true, NOW(), NOW()),
(8, 6, 'Disco Duro External', 120.00, 12, true, NOW(), NOW());

-- ==========================================
-- INSERTAR FACTURAS
-- ==========================================
INSERT INTO `tbFacturas` (`idCliente`, `fecha`, `subTotalFact`, `impuestoAPagar`, `total`, `estado`) VALUES
('001001001', '2026-02-15', 889.98, 115.70, 1005.68, 1),
('002002002', '2026-02-16', 389.98, 50.70, 440.68, 1),
('003003003', '2026-02-17', 1189.97, 154.70, 1344.67, 1),
('004004004', '2026-02-18', 179.97, 23.40, 203.37, 1),
('005005005', '2026-02-19', 659.97, 85.80, 745.77, 1);

-- ==========================================
-- INSERTAR DETALLES DE FACTURAS
-- ==========================================
-- Factura 1: Cliente 001001001
INSERT INTO `tbDetalleFactura` (`idFactura`, `idProducto`, `cantidad`, `precioUnitario`, `subTotalDet`) VALUES
(1, 1, 1, 799.99, 799.99),
(1, 2, 4, 25.50, 102.00);

-- Factura 2: Cliente 002002002
INSERT INTO `tbDetalleFactura` (`idFactura`, `idProducto`, `cantidad`, `precioUnitario`, `subTotalDet`) VALUES
(2, 3, 1, 89.99, 89.99),
(2, 5, 25, 12.99, 324.75);

-- Factura 3: Cliente 003003003
INSERT INTO `tbDetalleFactura` (`idFactura`, `idProducto`, `cantidad`, `precioUnitario`, `subTotalDet`) VALUES
(3, 4, 1, 299.99, 299.99),
(3, 6, 2, 59.99, 119.98),
(3, 7, 3, 79.99, 239.97),
(3, 8, 1, 120.00, 120.00);

-- Factura 4: Cliente 004004004
INSERT INTO `tbDetalleFactura` (`idFactura`, `idProducto`, `cantidad`, `precioUnitario`, `subTotalDet`) VALUES
(4, 2, 3, 25.50, 76.50),
(4, 5, 8, 12.99, 103.92);

-- Factura 5: Cliente 005005005
INSERT INTO `tbDetalleFactura` (`idFactura`, `idProducto`, `cantidad`, `precioUnitario`, `subTotalDet`) VALUES
(5, 3, 1, 89.99, 89.99),
(5, 6, 4, 59.99, 239.96),
(5, 7, 1, 79.99, 79.99),
(5, 1, 1, 799.99, 799.99);

-- ==========================================
-- VERIFICAR DATOS INSERTADOS
-- ==========================================
-- SELECT * FROM `tbCategorias`;
-- SELECT * FROM `tbClientes`;
-- SELECT * FROM `tbProductos`;
-- SELECT * FROM `tbFacturas`;
-- SELECT * FROM `tbDetalleFactura`;
