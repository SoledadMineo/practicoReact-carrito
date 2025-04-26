<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexión a la base de datos
$host = "localhost";
$usuario = "root";
$clave = "123456";
$baseDatos = "react";
$conexion = new mysqli($host, $usuario, $clave, $baseDatos);
if ($conexion->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

// Obtener el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];
parse_str($_SERVER['QUERY_STRING'] ?? "", $params);
$id = isset($params['id']) ? intval($params['id']) : null;

// Función para obtener el cuerpo del request (PUT y POST)
function getBody() {
    return json_decode(file_get_contents("php://input"), true);
}

// Rutas
switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conexion->prepare("SELECT * FROM instrumento WHERE id = ?");
            $stmt->bind_param("i", $id);
        } else {
            $stmt = $conexion->prepare("SELECT * FROM instrumento ORDER BY id ASC");
        }
        $stmt->execute();
        $resultado = $stmt->get_result();
        $instrumentos = [];
        while ($row = $resultado->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['precio'] = (float)$row['precio'];
            $row['cantidadVendida'] = (int)$row['cantidadVendida'];
            $row['costoEnvio'] = (float)$row['costoEnvio'];
            $instrumentos[] = $row;
        }
        echo json_encode($id ? $instrumentos[0] : $instrumentos);
        break;

    case 'POST':
        $data = getBody();
        $stmt = $conexion->prepare("INSERT INTO instrumento (nombre, descripcion, precio, cantidadVendida, costoEnvio, imagen) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdiis", $data['nombre'], $data['descripcion'], $data['precio'], $data['cantidadVendida'], $data['costoEnvio'], $data['imagen']);
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Instrumento agregado", "id" => $stmt->insert_id]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Error al insertar"]);
        }
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido para actualizar"]);
            break;
        }
        $data = getBody();
        $stmt = $conexion->prepare("UPDATE instrumento SET nombre = ?, descripcion = ?, precio = ?, cantidadVendida = ?, costoEnvio = ?, imagen = ? WHERE id = ?");
        $stmt->bind_param("ssdiisi", $data['nombre'], $data['descripcion'], $data['precio'], $data['cantidadVendida'], $data['costoEnvio'], $data['imagen'], $id);
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Instrumento actualizado"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Error al actualizar"]);
        }
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido para eliminar"]);
            break;
        }
        $stmt = $conexion->prepare("DELETE FROM instrumento WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Instrumento eliminado"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Error al eliminar"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

$conexion->close();
?>
