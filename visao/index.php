<?php

$url = (isset($_GET['pagina'])) ? $_GET['pagina'] : 'inicio';

$url = array_filter(explode('/', $url));

if (!empty($url[0])) {

    if ($url[0] === "inicio" || $url[0] === "cadastrar_pedido" || $url[0] === "visualizar_pedido") {
        require("inicio.php");
    }
}
?>