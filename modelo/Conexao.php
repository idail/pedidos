<?php

class Conexao{
    
    public static $conexao;
    
    public static function Obtem()
    {
    
        if(self::$conexao === null)
        {
            try{
                self::$conexao = new PDO("mysql:dbname=pedidos;host=localhost","root","");
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