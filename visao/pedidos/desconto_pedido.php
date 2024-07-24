<div class="modal fade" id="desconto-venda" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center">Desconto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="nome_produto" class="form-label">Nome Produto</label>
                    <input type="text" class="form-control" id="nome-produto-desconto" name="nome_produto_desconto" disabled>
                </div>
                <div class="mb-3">
                    <label for="valor" class="form-label">Valor</label>
                    <input type="text" class="form-control" id="valor-desconto" name="valor_desconto">
                </div>

                <input type="hidden" name="codigo_pedido_desconto" id="codigo-pedido-desconto">
            </div>

            <div class="alert alert-success" role="alert" id="mensagem-desconto-gravado">
            </div>

            <div class="alert alert-warning" role="alert" id="mensagem-falha-gravar-desconto">
            </div>

            <div class="alert alert-info" role="alert" id="mensagem-campo-vazio-desconto">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" id="gravar-desconto">Gravar</button>
            </div>
        </div>
    </div>
</div>