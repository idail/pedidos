$(document).ready(function (e) {
  $("#mensagem-pedido-gravado").hide();
  $("#mensagem-falha-gravar-pedido").hide();
  $("#mensagem-campo-vazio").hide();

  let url_pedido = window.location.href;

  if(url_pedido === "http://localhost/pedidos/visao/index.php?pagina=visualizar_pedido")
  {
    
  }
});


function visualizaPedidos(filtro,valorFiltro)
{
    
}

$(document).on("focus", "#valor", function (e) {
  e.preventDefault();

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$("#gravar").click(function (e) {
  e.preventDefault();

  debugger;

  let nomeProduto = $("#nome-produto").val();
  let valorProduto = $("#valor").val();
  let vencimentoProduto = $("#data-vencimento").val();

  if (nomeProduto === "") {
    $("#mensagem-campo-vazio").html("Favor preencher o nome do produto");
    $("#mensagem-campo-vazio").show();
    $("#mensagem-campo-vazio").fadeOut(4000);
    $("#nome-produto").focus();
  } else if (valorProduto === "") {
    $("#mensagem-campo-vazio").html("Favor preencher o valor do produto");
    $("#mensagem-campo-vazio").show();
    $("#mensagem-campo-vazio").fadeOut(4000);
    $("#valor").focus();
  } else if (vencimentoProduto === "") {
    $("#mensagem-campo-vazio").html(
      "Favor preencher a data de vencimento do produto"
    );
    $("#mensagem-campo-vazio").show();
    $("#mensagem-campo-vazio").fadeOut(4000);
    $("#data-vencimento").focus();
  } else {
    let valorProdoCortado = valorProduto.split("R$");

    let valorProdNumerico = valorProdoCortado[1];

    let valorProdNumero = valorProdNumerico.replace(/,/g, ".");

    let stringTemporario = valorProdNumero.replace(/\.(?=[^.]*$)/, "TEMP");

    stringTemporario = stringTemporario.replace(/\./g, "");

    let stringDecimal = stringTemporario.replace("TEMP", ".");

    let valorProdDecimal = parseFloat(stringDecimal);

    let dataVencimentoProdAmericana = vencimentoProduto
      .split("/")
      .reverse()
      .join("-");

    $.ajax({
      url: "../api/PedidoAPI.php",
      type: "post",
      dataType: "json",
      data: {
        valor_nome_produto: nomeProduto,
        valor_produto: valorProdDecimal,
        valor_vencimento_produto: dataVencimentoProdAmericana,
        processo_pedido: "recebe_cadastro_pedido",
      },
      success: function (retorno_gravar) {
        debugger;

        if (retorno_gravar > 0) {
            $("#mensagem-pedido-gravado").html("Pedido cadastrado com sucesso");
            $("#mensagem-pedido-gravado").show();
            $("#mensagem-pedido-gravado").fadeOut(4000);
        } else {
          $("#mensagem-falha-gravar-pedido").html(
            "Falha ao gravar pedido:" + error
          );
          $("#mensagem-falha-gravar-pedido").show();
          $("#mensagem-falha-gravar-pedido").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#mensagem-falha-gravar-pedido").html(
          "Falha ao gravar pedido:" + error
        );
        $("#mensagem-falha-gravar-pedido").show();
        $("#mensagem-falha-gravar-pedido").fadeOut(4000);
      },
    });
  }
});
