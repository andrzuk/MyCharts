<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");

include dirname(__FILE__) . '/../db/connection.php';

$result = array();
$success = FALSE;

$db_connection = connect();

$query = 'SELECT * FROM settings' .
'         ORDER BY id';

$statement = $db_connection->prepare($query);

$statement->execute();

$result = $statement->fetchAll(PDO::FETCH_ASSOC);

$success = TRUE;

echo json_encode (
	array (
		'result' => $result,
		'success' => $success
	)
);

?>
