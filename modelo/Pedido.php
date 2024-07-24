<?php
require("Conexao.php");
require("PedidoInterface.php");

class Pedido implements PedidoInterface{
    private $codigo_produto;
    private $nome_produto;
    private $valor;
    private $data_vencimento;
    private $filtro;
    private $valor_filtro;

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

    public function setFiltro($filtro)
    {
        $this->filtro = $filtro;
    }

    public function getFiltro()
    {
        return $this->filtro;
    }

    public function setValor_Filtro($valor_filtro)
    {
        $this->valor_filtro = $valor_filtro;
    }

    public function getValor_Filtro()
    {
        return $this->valor_filtro;
    }

    public function VisualizarPedidos():array
    {
        $pedidos = array();
        try{
            if($this->getFiltro() === "vencido" && $this->getValor_Filtro() === "vencido")
            {
                $instrucaoVerPedidos = "select * from pedidos where data_vencimento < CURDATE()";
                $comandoVerPedidos = Conexao::Obtem()->prepare($instrucaoVerPedidos);
                $comandoVerPedidos->execute();
                $pedidos = $comandoVerPedidos->fetchAll(PDO::FETCH_ASSOC);
            }else if($this->getFiltro() === "vencer_aproximado" && $this->getValor_Filtro() === "vencer_aproximado")
            {
                $instrucaoVerPedidos = "select * from pedidos where data_vencimento = CURDATE() + INTERVAL 3 DAY";
                $comandoVerPedidos = Conexao::Obtem()->prepare($instrucaoVerPedidos);
                $comandoVerPedidos->execute();
                $pedidos = $comandoVerPedidos->fetchAll(PDO::FETCH_ASSOC);
            }else if($this->getFiltro() === "vencer_maior_3" && $this->getValor_Filtro() === "vencer_maior_3")
            {
                $instrucaoVerPedidos = "select * from pedidos where data_vencimento > CURDATE() + INTERVAL 3 DAY";
                $comandoVerPedidos = Conexao::Obtem()->prepare($instrucaoVerPedidos);
                $comandoVerPedidos->execute();
                $pedidos = $comandoVerPedidos->fetchAll(PDO::FETCH_ASSOC);
            }
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

    public function AtualizarValor():string
    {
        try{
            $instrucaoAtualizarValor = "update pedidos set valor = :valor_atualizado where codigo_produto = :valor_codigo_produto";
            $comandoAtualizarValor = Conexao::Obtem()->prepare($instrucaoAtualizarValor);
            $comandoAtualizarValor->bindValue(":valor_atualizado",$this->getValor_Produto());
            $comandoAtualizarValor->bindValue(":valor_codigo_produto",$this->getCodigo_Produto());

            $resultadoAtualizarValor = $comandoAtualizarValor->execute();

            if($resultadoAtualizarValor)
                return "Desconto gravado";
            else
                return "Desconto não foi gravado";
        }catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function ExcluirPedidos():string
    {
        try{
            $instrucaoExcluirPedido = "delete from pedidos where codigo_produto = :valor_codigo_produto";
            $comandoExcluirPedido = Conexao::Obtem()->prepare($instrucaoExcluirPedido);
            $comandoExcluirPedido->bindValue(":valor_codigo_produto",$this->getCodigo_Produto());
            $resultadoExcluirPedido = $comandoExcluirPedido->execute();

            if($resultadoExcluirPedido)
                return "Pedido excluido com sucesso";
            else
                return "Pedido não foi excluido com sucesso";
        }catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return  $excecao->getMessage();
        }
    }
}
?>