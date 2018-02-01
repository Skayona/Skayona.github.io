<?php


function isEmail($email)
{
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_POST) {

    // Enter the email where you want to receive the message
   // $emailTo = 'gravitec.net@gmail.com';

	// $emailTo = 'skaya.online@gmail.com'; //test
	$emailTo = 'support@gravitec.net';
	$clientEmail = addslashes(trim($_POST['email']));
	$message     = addslashes(trim($_POST['message']));
	$page = addslashes(trim($_POST['site-page']));
	$html_path =  $_SERVER['HTTP_REFERER'];

	$array = array(
		'emailMessage' => '',
		'messageMessage' => '',
		'pageMessage' => ''
	);




	if (!isEmail($clientEmail)) {
		$array['emailMessage'] = 'Invalid email!';
	}

	if (isEmail($clientEmail)) {
		$headers = "Page: " . $page ."From: " . $clientEmail . " <" . $clientEmail . ">" . "\r\n" . "Reply-To: " . $clientEmail;
		mail($emailTo, "Message from '". $page ."' page", $clientEmail . "\r\n". $message . "\r\n" . $html_path, $headers);
	}

	echo json_encode($array);

}

?>
