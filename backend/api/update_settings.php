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
$affected = 0;

if (!empty($app_title) && !empty($app_logo) && !empty($last_values_limit) && !empty($present_data_limit) && !empty($sys_border_high) && !empty($sys_border_low) && !empty($dia_border_high) && !empty($dia_border_low) && !empty($pulse_border_high) && !empty($pulse_border_low) && !empty($token)) {
	
	$db_connection = connect();
	
	if (check_access($token, $db_connection)) {

		$query = "UPDATE settings SET key_value = :app_title" .
		"         WHERE key_name = 'app_title'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':app_title', $app_title, PDO::PARAM_STR);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :app_logo" .
		"         WHERE key_name = 'app_logo'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':app_logo', $app_logo, PDO::PARAM_STR);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :last_values_limit" .
		"         WHERE key_name = 'last_values_limit'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':last_values_limit', $last_values_limit, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :present_data_limit" .
		"         WHERE key_name = 'present_data_limit'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':present_data_limit', $present_data_limit, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :sys_border_high" .
		"         WHERE key_name = 'sys_border_high'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':sys_border_high', $sys_border_high, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :sys_border_low" .
		"         WHERE key_name = 'sys_border_low'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':sys_border_low', $sys_border_low, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :dia_border_high" .
		"         WHERE key_name = 'dia_border_high'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':dia_border_high', $dia_border_high, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :dia_border_low" .
		"         WHERE key_name = 'dia_border_low'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':dia_border_low', $dia_border_low, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :pulse_border_high" .
		"         WHERE key_name = 'pulse_border_high'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':pulse_border_high', $pulse_border_high, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		$query = "UPDATE settings SET key_value = :pulse_border_low" .
		"         WHERE key_name = 'pulse_border_low'";
		$statement = $db_connection->prepare($query);
		$statement->bindParam(':pulse_border_low', $pulse_border_low, PDO::PARAM_INT);
		$statement->execute();
		$affected += $statement->rowCount();

		if ($affected) {
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
