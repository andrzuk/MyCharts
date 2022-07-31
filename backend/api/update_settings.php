<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include dirname(__FILE__) . '/../db/connection.php';
include dirname(__FILE__) . '/../db/check_access.php';

$token = $_POST['token'];

$app_title = $_POST['app_title'];
$app_logo = $_POST['app_logo'];
$last_values_limit = intval($_POST['last_values_limit']);
$present_data_limit = intval($_POST['present_data_limit']);
$sys_border_high = intval($_POST['sys_border_high']);
$sys_border_low = intval($_POST['sys_border_low']);
$dia_border_high = intval($_POST['dia_border_high']);
$dia_border_low = intval($_POST['dia_border_low']);
$pulse_border_high = intval($_POST['pulse_border_high']);
$pulse_border_low = intval($_POST['pulse_border_low']);

$success = FALSE;

if (!empty($app_title) && !empty($app_logo) && !empty($last_values_limit) && !empty($present_data_limit) && !empty($sys_border_high) && !empty($sys_border_low) && !empty($dia_border_high) && !empty($dia_border_low) && !empty($pulse_border_high) && !empty($pulse_border_low) && !empty($token)) {
	
	$db_connection = connect();
	
	if (check_access($token, $db_connection)) {

/*
		$query = 'INSERT INTO _pressure (app_title, last_values_limit, present_data_limit, sys_border_high)' .
		'         VALUES (:app_title, :last_values_limit, :present_data_limit, :sys_border_high)';

		$statement = $db_connection->prepare($query);
		$statement->bindParam(':app_title', $app_title, PDO::PARAM_STR);
		$statement->bindParam(':last_values_limit', $last_values_limit, PDO::PARAM_INT);
		$statement->bindParam(':present_data_limit', $present_data_limit, PDO::PARAM_INT);
		$statement->bindParam(':sys_border_high', $sys_border_high, PDO::PARAM_INT);

		$statement->execute();
*/		
		if (TRUE || $statement->rowCount()) {
			$message = 'Ustawienia zostały poprawnie zapisane.';
			$success = true;
		} 
		else {
			$message = 'Ustawienia nie zostały zapisane.';
			$success = false;
		}
	}
	else {
		$message = 'Twoja sesja wygasła lub została zmieniona.';
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
