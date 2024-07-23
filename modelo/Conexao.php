<?php

class Conexao{
    
    public static $conexao;
    private static $servidor = "localhost";
    private static $banco = "pedidos";
    private static $senha = "";
    private static $usuario = "";
    
    public static function Obtem()
    {
    
        if(self::$conexao === null)
        {
            try{
                self::$conexao = new PDO("mysql:dbname=pedidos;host=localhost","root","");
                //self::$conexao = new PDO("mysql:dbname=".self::$banco.";host=".self::$servidor.",".self::$usuario.",".self::$senha."");
                self::$conexao->exec('SET CHARACTER SET utf8');
    
                return self::$conexao;
            }catch(PDOException $exception)
            {
                return $exception->getMessage();
            }catch(Exception $excecao)
            {
                return $excecao->getMessage();
            }
        }else{
            return self::$conexao;
        }
    }
}
?>