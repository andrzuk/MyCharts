<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include dirname(__FILE__) . '/../db/connection.php';
include dirname(__FILE__) . '/../db/check_access.php';

$token = $_POST['token'];

$season = $_POST['season'];
$sys = intval($_POST['sys']);
$dia = intval($_POST['dia']);
$pulse = intval($_POST['pulse']);

$success = FALSE;

if (!empty($season) && !empty($sys) && !empty($dia) && !empty($pulse) && !empty($token)) {
	
	$db_connection = connect();
	
	if (check_access($token, array(ADMIN, OPERATOR), $db_connection)) {

		$query = 'INSERT INTO _pressure (season, sys, dia, pulse, modified)' .
		'         VALUES (:season, :sys, :dia, :pulse, NOW())';

		$statement = $db_connection->prepare($query);
		$statement->bindParam(':season', $season, PDO::PARAM_STR);
		$statement->bindParam(':sys', $sys, PDO::PARAM_INT);
		$statement->bindParam(':dia', $dia, PDO::PARAM_INT);
		$statement->bindParam(':pulse', $pulse, PDO::PARAM_INT);

		$statement->execute();
		
		if ($statement->rowCount()) {
			$message = 'Pomiar został poprawnie zapisany.';
			$success = true;
		} 
		else {
			$message = 'Pomiar nie został zapisany.';
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
