<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conexion = new mysqli("localhost", "root", "", "instrumentosdb");
if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['instrumento']['id']) || !isset($data['cantidad'])) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit();
}

$instrumento_id = intval($data['instrumento']['id']);
$cantidad = intval($data['cantidad']);
$precio = floatval($data['instrumento']['precio']);
$totalPedido = $precio * $cantidad;
$fechaPedido = date('Y-m-d');

// 1. Insertar el pedido
$stmt = $conexion->prepare("INSERT INTO pedido (fechaPedido, totalPedido) VALUES (?, ?)");
if (!$stmt) {
    echo json_encode(["error" => "Error preparando la consulta de pedido: " . $conexion->error]);
    exit();
}
$stmt->bind_param("sd", $fechaPedido, $totalPedido);
$stmt->execute();
$pedido_id = $stmt->insert_id;
$stmt->close();

// 2. Insertar el detalle del pedido
$stmt_det = $conexion->prepare("INSERT INTO pedidodetalle (pedido_id, instrumento_id, cantidad) VALUES (?, ?, ?)");
if (!$stmt_det) {
    echo json_encode(["error" => "Error preparando la consulta de detalles: " . $conexion->error]);
    exit();
}
$stmt_det->bind_param("iii", $pedido_id, $instrumento_id, $cantidad);
$stmt_det->execute();
$stmt_det->close();

echo json_encode(["status" => "ok", "pedido_id" => $pedido_id]);
