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

// Obtener parámetro de ID si viene
$id = isset($_GET["id"]) ? intval($_GET["id"]) : null;

// Construir query
if ($id !== null) {
    $query = "SELECT * FROM categoria_instrumento WHERE id = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $id);
} else {
    $query = "SELECT * FROM instrumento ORDER BY id ASC";
    $stmt = $conexion->prepare($query);
}

// Ejecutar
$stmt->execute();
$resultado = $stmt->get_result();

$instrumentos = [];

while ($row = $resultado->fetch_assoc()) {
    $row['id'] = (int)$row['id'];
    $row['denominacion'] = (string)$row['denominacion'];
    $categoria_instrumentos[] = $row;
}

// Respuesta en JSON
header('Content-Type: application/json; charset=utf-8');

if ($id !== null && count($categoria_instrumentos) > 0) {
    echo json_encode($instrumentos[0]); // Un solo instrumento
} else {
    echo json_encode($instrumentos);    // Lista de instrumentos
}

$conexion->close();
