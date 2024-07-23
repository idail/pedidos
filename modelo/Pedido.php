<?php
require("Conexao.php");
require("PedidoInterface.php");

class Pedido implements PedidoInterface{
    private $codigo_produto;
    private $nome_produto;
    private $valor;
    private $data_vencimento;

    public function setCodigo_Produto($codigo_produto)
    {
        $this->codigo_produto = $codigo_produto;
    }

    public function getCodigo_Produto()
    {
        return $this->codigo_produto;
    }

    public function setNome_Produto($nome_produto)
    {
        $this->nome_produto = $nome_produto;
    }

    public function getNome_Produto()
    {
        return $this->nome_produto;
    }

    public function setValor_Produto($valor)
    {
        $this->valor = $valor;
    }

    public function getValor_Produto()
    {
        return $this->valor;
    }

    public function setData_Vencimento($data_vencimento)
    {
        $this->data_vencimento = $data_vencimento;
    }

    public function getData_Vencimento()
    {
        return $this->data_vencimento;
    }

    public function VisualizarPedidos():array
    {
        $pedidos = array();
        try{
            $instrucaoVerPedidos = "select * from pedidos";
            $comandoVerPedidos = Conexao::Obtem()->prepare($instrucaoVerPedidos);
            $comandoVerPedidos->execute();
            $pedidos = $comandoVerPedidos->fetchAll(PDO::FETCH_ASSOC);
        }catch(PDOException $exception)
        {
            array_push($pedidos,$exception->getMessage());
            return $pedidos;
        }catch(Exception $excecao)
        {
            array_push($pedidos,$excecao->getMessage());
            return $pedidos;
        }
        return $pedidos;
    }

    public function CadastrarPedidos():int
    {
        try{
            $instrucaoCadPedido = "insert into pedidos(nome_produto,valor,data_vencimento)values(:valor_nome_produto,:valor,:valor_data_vencimento)";
            $comandoCadPedido = Conexao::Obtem()->prepare($instrucaoCadPedido);
            $comandoCadPedido->bindValue(":valor_nome_produto",$this->getNome_Produto());
            $comandoCadPedido->bindValue(":valor",$this->getValor_Produto());
            $comandoCadPedido->bindValue(":valor_data_vencimento",$this->getData_Vencimento());

            $comandoCadPedido->execute();
            
            return Conexao::Obtem()->lastInsertId();
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        }
    }
}
?>