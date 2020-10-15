<?php
  require_once "recaptchalib.php";

  $secret = '6LcJt14UAAAAADzagp-RDjNWs-fxRxfuFd2RB1dF';
  //localhost $secret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
  $response = null;
  $reCaptcha = new ReCaptcha($secret);

  if ($_POST["g-recaptcha-response"]) {
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
  }

  if ($_POST && $response) {
    // Enter the email where you want to receive the message
    $emailTo = addslashes(trim($_POST["emailTo"]));

    if (empty($emailTo)) {
      $emailTo = "support@gravitec.net";
    }

    $subject = addslashes(trim($_POST["subject"]));
    $email = addslashes(trim($_POST["email"]));
    $name = addslashes(trim($_POST["name"]));
    $message = addslashes(trim($_POST["message"]));
    $html_path =  $_SERVER["HTTP_REFERER"];

    $headers =  "Content-type:text/plain;charset=utf-8" . "\r\n" .
                "From: landing";

    if ($subject === "Get started for free") {
      $emailMessage = "Page: " . $html_path . "\r\n".
                      "Email: " . $email;
    } else {
      $emailMessage = "Page: " . $html_path . "\r\n".
                      "Name: " . $name . "\r\n".
                      "Email: " . $email . "\r\n".
                      "Message: " . $message;
    }

    mail($emailTo, $subject, $emailMessage, $headers);

    // echo json_encode($array);
  }
?>

