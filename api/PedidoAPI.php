<?php
require("../controladora/PedidoControladora.php");

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

$pedidoControladora = new PedidoControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    if($_POST["processo_pedido"] === "recebe_cadastro_pedido")
    {
        $valorNomeProduto = $_POST["valor_nome_produto"];
        $valorProduto = $_POST["valor_produto"];
        $valorVencimentoProduto = $_POST["valor_vencimento_produto"];

        if(!empty($valorNomeProduto) && !empty($valorProduto) && !empty($valorVencimentoProduto))
        {
            $resultadoCadastrarPedido = $pedidoControladora->CadastrarPedidos($valorNomeProduto,$valorProduto,$valorVencimentoProduto);

            echo json_encode($resultadoCadastrarPedido);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }
}
?>