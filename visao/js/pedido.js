$(document).ready(function (e) {
  $("#mensagem-pedido-gravado").hide();
  $("#mensagem-falha-gravar-pedido").hide();
  $("#mensagem-campo-vazio").hide();

  let url_pedido = window.location.href;

  if (
    url_pedido ===
    "http://localhost/pedidos/visao/index.php?pagina=visualizar_pedido"
  ) {
    $("#mensagem-falha-listar-pedidos").hide();
    $("#mensagem-campo-vazio-listar-pedidos").hide();
    $("#mensagem-desconto-gravado").hide();
    $("#mensagem-falha-gravar-desconto").hide();
    $("#mensagem-campo-vazio-desconto").hide();
    $("#mensagem-falha-excluir-pedidos").hide();
    $("#mensagem-pedido-excluido").hide();
    $("#mensagem-pedido-alterado").hide();
    $("#mensagem-falha-alterar-pedido").hide();
    $("#mensagem-campo-vazio-alterar-pedido").hide();
    visualizaPedidos("vencido", "vencido");
  }
});

let recebeFiltro = "";
let recebevalorFiltro = "";

function visualizaPedidos(filtro, valorFiltro) {
  debugger;

  $.ajax({
    url: "../api/PedidoAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_pedido: "recebe_consultar_pedidos",
      filtroPedido: filtro,
      valorFiltroPedido: valorFiltro,
    },
    success: function (retorno_pedidos) {
      debugger;

      recebeFiltro = filtro;
      recebevalorFiltro = valorFiltro;

      if (retorno_pedidos.length > 0) {
        let recebeTabelaPedidos = document.querySelector("#lista-pedidos");

        $("#lista-pedidos").html("");

        for (let indice = 0; indice < retorno_pedidos.length; indice++) {
          let valorVendaPedido = retorno_pedidos[indice].valor.toString();

          let valorPedidoBR = "R$" + valorVendaPedido.replace(".", ",");

          let valorDataVencBR = retorno_pedidos[indice].data_vencimento
            .split("-")
            .reverse()
            .join("/");

          let dataVencimentoProdAmericana = retorno_pedidos[
            indice
          ].data_vencimento
            .split("/")
            .reverse()
            .join("-");

          let vencimento = new Date(dataVencimentoProdAmericana);

          let atual = new Date();

          let diferenca = calcularDatas(atual, vencimento);

          let valorDatasInteiro = Math.round(diferenca);

          let verificacao = "";

          let url_desconto = "";

          if (filtro === "vencido") {
            if (valorDatasInteiro > 0) {
              verificacao = "background:red";
            }
          } else if (filtro === "vencer_aproximado") {
            if (valorDatasInteiro > 0) {
              verificacao = "background:yellow";
              url_desconto =
                "<td><a><i class='bi bi-tag-fill text-primary' data-param-codigo='" +
                retorno_pedidos[indice].codigo_produto +
                "' data-param-nome='" +
                retorno_pedidos[indice].nome_produto +
                "' data-param-valor='" +
                retorno_pedidos[indice].valor +
                "'" +
                "style='font-size: 20px;' title='Desconto' data-bs-toggle='modal' data-bs-target='#desconto-venda' data-backdrop='static' id='carrega-desconto'></i></a></td>";
            }
          } else {
            if (valorDatasInteiro > 0) {
              verificacao = "background:green";
              url_desconto =
                "<td><a><i class='bi bi-tag-fill' text-primary data-param-codigo='" +
                retorno_pedidos[indice].codigo_produto +
                "' data-param-nome='" +
                retorno_pedidos[indice].nome_produto +
                "' data-param-valor='" +
                retorno_pedidos[indice].valor +
                "'" +
                "style='font-size: 20px;' title='Desconto' data-bs-toggle='modal' data-bs-target='#desconto-venda' data-backdrop='static' id='carrega-desconto'></i></a></td>";
            }
          }

          recebeTabelaPedidos.innerHTML +=
            "<tr>" +
            "<td style='width:20%;" +
            verificacao +
            "'></td>" +
            "<td>" +
            retorno_pedidos[indice].nome_produto +
            "</td>" +
            "<td>" +
            valorPedidoBR +
            "</td>" +
            "<td>" +
            valorDataVencBR +
            "</td>" +
            "<td><a href='#'><i class='bi bi-trash' style='font-size:20px;' title='Excluir' onclick=excluirPedido(" + retorno_pedidos[indice].codigo_produto + ",event)></i></a></td>" +
            "<td><a href='#'><i class='bi bi-journal-album' style='font-size:20px;' data-param-codigo=" + retorno_pedidos[indice].codigo_produto + " data-param-nome='" + retorno_pedidos[indice].nome_produto + "'" +
            "data-param-valor='" + valorPedidoBR + "' data-param-data='" + valorDataVencBR + "' data-bs-toggle='modal' data-bs-target='#alterar-pedido' data-backdrop='static' title='Alterar' id='carregaAlterarPedido'></i></a></td>" +
            url_desconto;
          ("</tr>");
        }

        $("#lista-pedidos").append(recebeTabelaPedidos);
      } else {
        $("#lista-pedidos").html("");
        $("#lista-pedidos").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) {
      $("#mensagem-falha-listar-pedidos").html(
        "Falha ao consultar pedido:" + error
      );
      $("#mensagem-falha-listar-pedidos").show();
      $("#mensagem-falha-listar-pedidos").fadeOut(4000);
    },
  });
}

$(document).on("click", "#carrega-desconto", function (e) {
  e.preventDefault();

  debugger;

  let recebeCodigoPedido = $(this).data("param-codigo");

  let recebeNomePedido = $(this).data("param-nome");

  let recebeValorPedido = $(this).data("param-valor").toString();

  let recebeValorPedidoBR = "R$" + recebeValorPedido.replace(".", ",");

  $("#nome-produto-desconto").val(recebeNomePedido);
  $("#valor-desconto").val(recebeValorPedidoBR);
  $("#codigo-pedido-desconto").val(recebeCodigoPedido);
});

$("#gravar-desconto").click(function (e) {
  e.preventDefault();

  debugger;

  let valorDesconto = $("#valor-desconto").val();
  let codigoPedido = $("#codigo-pedido-desconto").val();

  if (valorDesconto === "") {
    $("#mensagem-campo-vazio-desconto").html(
      "Favor preencher o valor do desconto"
    );
    $("#mensagem-campo-vazio-desconto").show();
    $("#mensagem-campo-vazio-desconto").fadeOut(4000);
  } else {

    let valorProduCortado = valorDesconto.split("R$");

    let valorProdNumerico = valorProduCortado[1];

    let valorProdNumero = valorProdNumerico.replace(/,/g, ".");

    let stringTemporario = valorProdNumero.replace(/\.(?=[^.]*$)/, "TEMP");

    stringTemporario = stringTemporario.replace(/\./g, "");

    let stringDecimal = stringTemporario.replace("TEMP", ".");

    let valorProdDecimal = parseFloat(stringDecimal);

    $.ajax({
      url: "../api/PedidoAPI.php",
      type: "post",
      dataType: "json",
      data: {
        valor_produto_desconto: valorProdDecimal,
        valor_codigo_desconto: codigoPedido,
        processo_pedido: "recebe_atualizar_valor_produto",
        metodo:"PUT",
      },
      success: function (retorno_desconto) {
        debugger;
        
        if(retorno_desconto === "Desconto gravado")
        {
          $("#mensagem-desconto-gravado").html(retorno_desconto);
          $("#mensagem-desconto-gravado").show();
          $("#mensagem-desconto-gravado").fadeOut(4000);

          visualizaPedidos(recebeFiltro,recebevalorFiltro);
        }else{
          $("#mensagem-falha-gravar-desconto").html("Falha ao gravar desconto:" + retorno_desconto);
          $("#mensagem-falha-gravar-desconto").show();
          $("#mensagem-falha-gravar-desconto").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#mensagem-falha-gravar-desconto").html("Falha ao gravar desconto:" + error);
        $("#mensagem-falha-gravar-desconto").show();
        $("#mensagem-falha-gravar-desconto").fadeOut(4000);
      },
    });
  }
});

function excluirPedido(valorCodigoPedido,e)
{
    e.preventDefault();

    debugger;

    let recebeRespostaExcluirPedido = window.confirm("Tem certeza que deseja excluir o pedido?");

    console.log(recebeFiltro + recebevalorFiltro);

    if(recebeRespostaExcluirPedido)
    {
      $.ajax({
        url: "../api/PedidoAPI.php",
        type: "DELETE",
        dataType: "json",
        cache: false,
        data: JSON.stringify({
          processo_pedido: "recebe_exclui_pedido",
          valor_codigo_pedido_exclui: valorCodigoPedido,
        }),
        success: function (retorno_excluir) 
        {
          debugger;

          if(retorno_excluir === "Pedido excluido com sucesso")
          {
            $("#mensagem-pedido-excluido").html(retorno_excluir);
            $("#mensagem-pedido-excluido").show();
            $("#mensagem-pedido-excluido").fadeOut(4000);

            visualizaPedidos(recebeFiltro,recebevalorFiltro);
          }
        },
        error:function(xhr,status,error)
        {
          $("#mensagem-falha-excluir-pedidos").html("Falha ao excluir pedido: " + error);
          $("#mensagem-falha-excluir-pedidos").show();
          $("#mensagem-falha-excluir-pedidos").fadeOut(4000);
        },
      });
    }else{
      return;
    }
}

$(document).on("click","#carregaAlterarPedido",function(e){
  e.preventDefault();

  debugger;

  let recebeCodigoPedido = $(this).data("param-codigo");

  let recebeNomePedido = $(this).data("param-nome");

  let recebValorPedido = $(this).data("param-valor");

  let recebeDataPedido = $(this).data("param-data");

  let recebeDataAmericana = recebeDataPedido.split("/")
  .reverse()
  .join("-");

  $("#nome-produto-alterar").val(recebeNomePedido);
  $("#valor-alterar").val(recebValorPedido);
  $("#data-vencimento-alterar").val(recebeDataAmericana);
  $("#codigo-produto-alterar").val(recebeCodigoPedido);
});

function calcularDatas(primeira_data, segunda_data) {
  return (
    Math.abs(
      new Date(primeira_data).getTime() - new Date(segunda_data).getTime()
    ) /
    (1000 * 60 * 60 * 24)
  );
}

$(document).on("focus", "#valor", function (e) {
  e.preventDefault();

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$(document).on("focus", "#valor-desconto", function (e) {
  e.preventDefault();

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$(document).on("focus", "#valor-alterar", function (e) {
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
    let valorProduCortado = valorProduto.split("R$");

    let valorProdNumerico = valorProduCortado[1];

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

$("#alteracao-pedido").click(function(e){
  e.preventDefault();

  debugger;

  let recebeCodigoPedido = $("#codigo-produto-alterar").val();
  let recebeNomePedido = $("#nome-produto-alterar").val();
  let recebeValorPedido = $("#valor-alterar").val();
  let recebeVencimentoPedido = $("#data-vencimento-alterar").val();

  if(recebeNomePedido === "")
  {
    $("#mensagem-campo-vazio-alterar-pedido").html("Favor preencher o nome do produto");
    $("#mensagem-campo-vazio-alterar-pedido").show();
    $("#mensagem-campo-vazio-alterar-pedido").fadeOut(4000);
    $("#nome-produto-alterar").focus();
  }else if(recebeValorPedido === "")
  {
    $("#mensagem-campo-vazio-alterar-pedido").html("Favor preencher o valor do produto");
    $("#mensagem-campo-vazio-alterar-pedido").show();
    $("#mensagem-campo-vazio-alterar-pedido").fadeOut(4000);
    $("#valor-alterar").focus();
  }else if(recebeVencimentoPedido === "")
  {
    $("#mensagem-campo-vazio-alterar-pedido").html("Favor preencher a data de vencimento do produto");
    $("#mensagem-campo-vazio-alterar-pedido").show();
    $("#mensagem-campo-vazio-alterar-pedido").fadeOut(4000);
    $("#data-vencimento-alterar").focus();
  }else{

    let valorProduCortado = recebeValorPedido.split("R$");

    let valorProdNumerico = valorProduCortado[1];

    let valorProdNumero = valorProdNumerico.replace(/,/g, ".");

    let stringTemporario = valorProdNumero.replace(/\.(?=[^.]*$)/, "TEMP");

    stringTemporario = stringTemporario.replace(/\./g, "");

    let stringDecimal = stringTemporario.replace("TEMP", ".");

    let valorProdDecimal = parseFloat(stringDecimal);
    
    let dataVencimentoAmericana = recebeVencimentoPedido.split("/")
    .reverse()
    .join("-");

    $.ajax({
      url: "../api/PedidoAPI.php",
      type: "post",
      dataType: "json",
      data: {
        valor_nome_produto_alterar: recebeNomePedido,
        valor_produto_alterar: valorProdDecimal,
        valor_vencimento_produto_alterar: dataVencimentoAmericana,
        valor_codigo_produto_alterar:recebeCodigoPedido,
        processo_pedido: "recebe_alterar_pedido",
        metodo:"PUT",
      },
      success: function (retorno_alterar) {
        debugger;

        if (retorno_alterar === "Pedido alterado com sucesso") {
          $("#mensagem-pedido-alterado").html(retorno_alterar);
          $("#mensagem-pedido-alterado").show();
          $("#mensagem-pedido-alterado").fadeOut(4000);

          visualizaPedidos(recebeFiltro,recebevalorFiltro);
        } else {
          $("#mensagem-falha-alterar-pedido").html(
            "Falha ao gravar pedido:" + error
          );
          $("#mensagem-falha-alterar-pedido").show();
          $("#mensagem-falha-alterar-pedido").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#mensagem-falha-alterar-pedido").html(
          "Falha ao gravar pedido:" + error
        );
        $("#mensagem-falha-alterar-pedido").show();
        $("#mensagem-falha-alterar-pedido").fadeOut(4000);
      },
    });
  }
});

$("#selecao-data").change(function (e) {
  e.preventDefault();

  debugger;

  let filtro = $(this).val();

  if (filtro === "selecione") {
    $("#mensagem-campo-vazio-listar-pedidos").html(
      "Favor selecionar a categoria desejada"
    );
    $("#mensagem-campo-vazio-listar-pedidos").show();
    $("#mensagem-campo-vazio-listar-pedidos").fadeOut(4000);
  } else {
    let valorFiltro = "";

    if (filtro === "vencido") valorFiltro = "vencido";
    else if (filtro === "vencer_aproximado") valorFiltro = "vencer_aproximado";
    else valorFiltro = "vencer_maior_3";

    visualizaPedidos(filtro, valorFiltro);
  }
});