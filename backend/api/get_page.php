<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");

include dirname(__FILE__) . '/../db/connection.php';

$id = $_GET['id'] == 'index' ? 1 : ($_GET['id'] == 'contact' ? 2 : 0);

$result = array();
$success = FALSE;

if (!empty($id)) {
	
	$db_connection = connect();

	$query = 'SELECT * FROM pages WHERE id = :id';

	$statement = $db_connection->prepare($query);
	$statement->bindParam(':id', $id, PDO::PARAM_INT);
	
	$statement->execute();
	
	$result = $statement->fetch(PDO::FETCH_ASSOC);
	
	$success = TRUE;
}

echo json_encode (
	array (
		'result' => $result,
		'success' => $success
	)
);

?>
