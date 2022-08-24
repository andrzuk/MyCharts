<?php

function get_token() {
	
	$token = NULL;

	foreach (getallheaders() as $key => $value) {
		if ($key == 'X-Auth-Token' || $key == 'x-auth-token') {
			$token = $value;
		}
	}
	return $token;	
}

function check_access($token, $levels, $db_connection) {
	
	$result = false;
	
	if ($token) {
		
		$query = 'SELECT id FROM users' .
		'         WHERE token = :token' .
		'         AND status IN ('. implode(', ', $levels) .')' .
		'         AND active = 1' .
		'         ORDER BY logged_in DESC LIMIT 1';

		$statement = $db_connection->prepare($query);

		$statement->bindValue(':token', $token, PDO::PARAM_STR); 

		$statement->execute();

		$row_item = $statement->fetch(PDO::FETCH_ASSOC);
	
		if (is_array($row_item)) {

			if (array_key_exists('id', $row_item)) {

				$result = $row_item['id'] > 0;
			}
		}
	}

	return $result;
}

function get_user_by_token($token, $db_connection) {
	
	$result = false;
	
	$query = 'SELECT * FROM users WHERE token = :token';

	$statement = $db_connection->prepare($query);

	$statement->bindValue(':token', $token, PDO::PARAM_STR); 

	$statement->execute();

	$result = $statement->fetch(PDO::FETCH_ASSOC);

	return $result;
}

?>

