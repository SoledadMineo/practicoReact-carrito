<?php
// Configuración de CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// Configuración de la base de datos
$host = "localhost";
$usuario = "root";
$clave = "";
$baseDatos = "instrumentosdb";

// Crear conexión
$conexion = new mysqli($host, $usuario, $clave, $baseDatos);

// Verificar conexión
if ($conexion->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

$sql = "
    SELECT 
        DATE_FORMAT(fechaPedido, '%Y-%m') AS mes_anio,
        COUNT(*) AS cantidad_pedidos
    FROM pedido
    GROUP BY mes_anio
    ORDER BY mes_anio ASC
";

$result = $conn->query($sql);

$data = [["Mes-Año", "Cantidad de Pedidos"]]; // encabezado para Google Charts

while ($row = $result->fetch_assoc()) {
    $data[] = [$row["mes_anio"], (int)$row["cantidad_pedidos"]];
}

$conn->close();

// Devolver JSON
echo json_encode($data);


