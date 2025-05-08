<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json'); // <-- Esto va al principio

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$raw_data = file_get_contents("php://input");
error_log("Datos recibidos: " . $raw_data);

$data = json_decode($raw_data, true);

if (!is_array($data) || !isset($data['fechaPedido']) || !isset($data['totalPedido']) || !isset($data['detalles'])) {
    http_response_code(400);
    echo json_encode(["error" => "Formato inválido de datos"]);
    exit();
}

$fecha = $data['fechaPedido'];
$totalPedido = $data['totalPedido'];
$detalles = $data['detalles'];

$conexion = new mysqli("localhost", "root", "", "instrumentosdb");
if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Conexión fallida: " . $conexion->connect_error]);
    exit();
}

// Insertar pedido
$stmt_pedido = $conexion->prepare("INSERT INTO pedido (fechaPedido, totalPedido) VALUES (?, ?)");
$stmt_pedido->bind_param("sd", $fecha, $totalPedido);
$stmt_pedido->execute();
$pedido_id = $stmt_pedido->insert_id;
$stmt_pedido->close();

// Insertar detalles
$stmt_detalle = $conexion->prepare("INSERT INTO pedidodetalle (pedido_id, instrumento_id, cantidad) VALUES (?, ?, ?)");
foreach ($detalles as $item) {
    $idInstrumento = intval($item['idInstrumento']);
    $cantidad = intval($item['cantidad']);
    $stmt_detalle->bind_param("iii", $pedido_id, $idInstrumento, $cantidad);
    $stmt_detalle->execute();
}
$stmt_detalle->close();

// Devolver solo una respuesta JSON válida
echo json_encode(["success" => true, "pedido_id" => $pedido_id]);
