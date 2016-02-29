<?php

$name = $_GET['name'];
$phone = $_GET['phone'];
$time = $_GET['time'];

if ($_GET['send'] == true) {

    $to = 'kuzmenkos1986@gmail.com';
    $subject = 'Обратный звонок';
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$name.'</p>
                        <p>Телефон: '.$phone.'</p>
                        <p>Удобное время: '.$time.'</p>
                    </body>
                </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    mail($to, $subject, $message, $headers);
    echo $name, $phone, $time;

}

exit;
?>