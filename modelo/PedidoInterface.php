<?php
interface PedidoInterface{
    public function VisualizarPedidos():array;
    public function CadastrarPedidos():int;
    public function AtualizarValor():string;
}
?>