<?php
    
		$json = file_get_contents('../files/results.json');
		$data = json_decode($json);
		$data1 = json_decode($_POST['foo']);
		$data[] = $data1;
		file_put_contents('../files/results.json', json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT));
    
?>