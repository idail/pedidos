<?php
require("../modelo/Pedido.php");
class PedidoControladora{
    private $pedido;

    public function __construct()
    {
        $this->pedido = new Pedido();
    }

    public function CadastrarPedidos($valor_nome_prod,$valor_prod,$valor_vencimento_prod)
    {
        $this->pedido->setNome_Produto($valor_nome_prod);
        $this->pedido->setValor_Produto($valor_prod);
        $this->pedido->setData_Vencimento($valor_vencimento_prod);

        return $this->pedido->CadastrarPedidos();
    }

    public function ConsultarPedidos($filtro,$valorFiltro)
    {
        $this->pedido->setFiltro($filtro);
        $this->pedido->setValor_Filtro($valorFiltro);

        return $this->pedido->VisualizarPedidos();
    }

    public function AtualizarValor($valor_codigo_prod,$valor_prod)
    {
        $this->pedido->setCodigo_Produto($valor_codigo_prod);
        $this->pedido->setValor_Produto($valor_prod);

        return $this->pedido->AtualizarValor();
    }

    public function ExcluirPedidos($valor_codigo_prod)
    {
        $this->pedido->setCodigo_Produto($valor_codigo_prod);

        return $this->pedido->ExcluirPedidos();
    }

    public function AlterarPedido($valor_nome_prod,$valor_prod,$valor_vencimento_prod,$valor_codigo_prod)
    {
        $this->pedido->setCodigo_Produto($valor_codigo_prod);
        $this->pedido->setNome_Produto($valor_nome_prod);
        $this->pedido->setValor_Produto($valor_prod);
        $this->pedido->setData_Vencimento($valor_vencimento_prod);

        return $this->pedido->AlterarPedido();
    }
}
?>