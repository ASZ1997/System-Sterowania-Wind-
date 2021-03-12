<?php
 
//Reduce errors
error_reporting(~E_WARNING);
 
//Create a UDP socket
if(!($sock = socket_create(AF_INET, SOCK_DGRAM, 0)))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
     
    die("Couldn't create socket: [$errorcode] $errormsg \n");
}
 
echo "Socket created \n";
 
// Bind the source address
if( !socket_bind($sock, "192.168.1.101" , 245) )
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
     
    die("Could not bind socket : [$errorcode] $errormsg \n");
}
 
echo "Socket bind OK \n";

//Do some communication, this loop can handle multiple clients

//Receive some data
$r = socket_recvfrom($sock, $buf, 512, 0, $remote_ip, $remote_port);
$mensaje = "$remote_ip:$remote_port: ," . $buf;
   
echo $mensaje;
 
socket_close($sock);
?>