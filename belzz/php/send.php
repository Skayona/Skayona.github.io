<?php
if ($_POST) {
   // Enter the email where you want to receive the message
	$emailTo1 = 'anevesenko17@yandex.ru'; 
	// $emailTo2 = 'catmallua@gmail.com'; //test
	$name = addslashes(trim($_POST['callback-name']));
	$tel = addslashes(trim($_POST['callback-tel']));


  $headers = "New request for callback" . "\r\n" . "Content-type:text/plain;charset=utf-8" . "\r\n";
  $subject = "Новый запрос на обратный звонок: ". $name .", ".$tel;
  $emailMessage = "Name: " . $name . "\r\n". "Tel: " . $tel;
  mail($emailTo1, $subject, $emailMessage, $headers);
  // mail($emailTo2, $subject, $emailMessage, $headers);

	echo json_encode($array);
}
?>

