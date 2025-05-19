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


// Datos para gráfico de torta (ej. cantidad por categoría)
$sqlPie = "
    SELECT c.nombre as categoria, COUNT(*) as cantidad
    FROM pedido p
    JOIN articulo a ON p.articulo_id = a.id
    JOIN categoria c ON a.categoria_id = c.id
    GROUP BY c.nombre
";
$result = $conn->query($sqlPie);
$data = [["Categoría", "Cantidad"]];
while ($row = $resultPie->fetch_assoc()) {
    $data[] = [$row["categoria"], (int)$row["cantidad"]];
}

$conn->close();

/// Devolver JSON
echo json_encode($data);



