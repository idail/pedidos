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
    }else if($_POST["processo_pedido"] === "recebe_atualizar_valor_produto")
    {
        if($_POST["metodo"] === "PUT")
        {
            $valorCodigoProduto = $_POST["valor_codigo_desconto"];
            $valorProduto = $_POST["valor_produto_desconto"];

            $resultadoAtualizarValor = $pedidoControladora->AtualizarValor($valorCodigoProduto,$valorProduto);

            echo json_encode($resultadoAtualizarValor);
        }
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET")
{
    if($_GET["processo_pedido"] === "recebe_consultar_pedidos")
    {
        $filtroPedido = $_GET["filtroPedido"];
        $valorFiltroPedido = $_GET["valorFiltroPedido"];

        $resultadoConsultarPedido = $pedidoControladora->ConsultarPedidos($filtroPedido,$valorFiltroPedido);

        echo json_encode($resultadoConsultarPedido);
    }
}else if($_SERVER["REQUEST_METHOD"] === "DELETE")
{
    $processoPedido = json_decode(file_get_contents("php://input",true));

    if(!empty($processoPedido->processo_pedido === "recebe_exclui_pedido"))
    {
        $resultadoExcluirPedido = $pedidoControladora->ExcluirPedidos($processoPedido->valor_codigo_pedido);

        echo json_encode($resultadoExcluirPedido);
    }else{
        echo json_encode("Falha ao excluir o produto devido não ter codigo");
    }
}
?>