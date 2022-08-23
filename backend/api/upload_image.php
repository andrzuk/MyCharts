<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Description: File Transfer');

$res = file_get_contents("php://input");

$resArray = json_decode($res);

foreach($resArray as $k => $v) {
	if ($k == 'data') $fileData = $v;
	if ($k == 'name') $fileName = $v;
	if ($k == 'size') $fileSize = $v;
	if ($k == 'type') $fileType = $v;
}

$result = isset($fileData) && isset($fileName) && isset($fileSize) && isset($fileType);

$imgData = str_replace(' ', '+', $fileData);
$imgData = substr($imgData, strpos($imgData, ",") + 1);
$imgData = base64_decode($imgData);

$url = '../uploads/'. $fileName;

file_put_contents($url, $imgData);

$error = array(
	'message' => 'File upload failed.',
);

echo json_encode (
	array (
		'uploaded' => $result ? 1 : 0,
		'fileName' => $fileName,
		'url' => 'http://my-booking.cba.pl/uploads/'.$fileName,
		'error' => $error,
	)
);

?>
