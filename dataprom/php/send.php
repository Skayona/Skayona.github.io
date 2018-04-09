<?php


function isEmail($email)
{
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_POST) {

   // Enter the email where you want to receive the message
	// $emailTo1 = 'skaya.online@gmail.com'; //test
	// $emailTo2 = 'catmallua@gmail.com'; //test
	$emailTo1 = 'sales@data-prom.com';
	$emailTo2 = 'info@data-prom.com';

	$clientEmail = addslashes(trim($_POST['email']));
	$clientName = addslashes(trim($_POST['name']));
	$clientTel = addslashes(trim($_POST['tel']));
	$store = addslashes(trim($_POST['store']));
	$message = addslashes(trim($_POST['message']));
	$page = addslashes(trim($_POST['form']));




	if (isEmail($clientEmail)) {
		$headers = "Form: " . $page . "\r\n" . "From: ". "$clientEmail" . "\r\n" . "Content-type:text/plain;charset=utf-8" . "\r\n";
		$subject = "New message from '". $page ."'";
		$emailMessage = "Email: " . $clientEmail . "\r\n". "Name: " . $clientName  . "\r\n" . "Tel: " . $clientTel . "\r\n" . "Store: " . $store . "\r\n". "Message: " . $message . "\r\n" . "From form: " . $page;
		mail($emailTo1, $subject, $emailMessage, $headers);
		mail($emailTo2, $subject, $emailMessage, $headers);
	}

	echo json_encode($array);

}

?>
