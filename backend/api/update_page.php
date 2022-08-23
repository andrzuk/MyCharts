<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include dirname(__FILE__) . '/../db/connection.php';
include dirname(__FILE__) . '/../db/check_access.php';

$token = $_POST['token'];

$id = $_POST['pageId'] == 'index' ? 1 : ($_POST['pageId'] == 'contact' ? 2 : 0);
$contents = $_POST['editorContent'];

$success = FALSE;
$affected = 0;

if (!empty($id) && !empty($contents) && !empty($token)) {
	
	$db_connection = connect();
	
	if (check_access($token, array(ADMIN, OPERATOR), $db_connection)) {

		$query = "UPDATE pages SET contents = :contents, modified = NOW()" .
		"         WHERE id = :id";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':contents', $contents, PDO::PARAM_STR);
		$statement->bindParam(':id', $id, PDO::PARAM_INT);
		$statement->execute();
		$affected = $statement->rowCount();

		if ($affected) {
			$message = 'Strona została poprawnie zapisana.';
			$success = true;
		} 
		else {
			$message = 'Strona nie została zapisana.';
			$success = false;
		}
	}
	else {
		$message = 'Nie posiadasz wystarczających uprawnień.';
		$success = false;
	}
} 
else {
	$message = 'Nie podano wszystkich wymaganych danych.';
	$success = false;
}

echo json_encode (
	array (
		'success' => $success,
		'message' => $message,
	)
);

?>
