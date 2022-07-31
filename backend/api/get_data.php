<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");

include dirname(__FILE__) . '/../db/connection.php';
include dirname(__FILE__) . '/../db/check_access.php';

$token = get_token();

$result = array();
$success = FALSE;

if (!empty($token)) {
	
	$db_connection = connect();

	if (check_access($token, $db_connection)) {
		
		$query = 'SELECT * FROM _pressure' .
		'         ORDER BY id DESC';

		$statement = $db_connection->prepare($query);

		$statement->execute();
		
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$success = TRUE;
	}
}

echo json_encode (
	array (
		'result' => $result,
		'success' => $success
	)
);

?>
