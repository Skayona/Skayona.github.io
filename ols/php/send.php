<?php


function isEmail($email)
{
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_POST) {

   // Enter the email where you want to receive the message
	$emailTo = 'catmallua@gmail.com'; //test
	$emailTo = '';


	$clientEmail = addslashes(trim($_POST['email']));
	$clientName = addslashes(trim($_POST['name']));
	$clientTel = addslashes(trim($_POST['tel']));
	$clientSubject = addslashes(trim($_POST['subject']));
	$clientMessage = addslashes(trim($_POST['message']));
	$clientPage = addslashes(trim($_POST['form']));
	$antispam = addslashes(trim($_POST['check']));
	if ($antispam != 'isChecked') exit ('Spam decected');



	if (isEmail($clientEmail)) {
		$headers = "Form: " . $page . "\r\n" . "From: ". "$clientEmail" . "\r\n" . "Content-type:text/plain;charset=utf-8" . "\r\n";
		$subject = "New message from '". $page ."'";
		$emailMessage = "Email: " . $clientEmail . "\r\n". "Name: " . $clientName  . "\r\n" . "Tel: " . $clientTel . "\r\n" . "Subject: " . $clientSubject . "\r\n". "Message: " . $clientMessage . "\r\n" . "From form: " . $page;
		mail($emailTo, $subject, $emailMessage, $headers);
	}

	echo json_encode($array);

}

?>
