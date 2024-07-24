<div class="modal fade" id="alterar-pedido" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center">Alterar Pedido</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="nome_produto" class="form-label">Nome Produto</label>
                        <input type="text" class="form-control" id="nome-produto-alterar" name="nome_produto_alterar">
                    </div>
                    <div class="mb-3">
                        <label for="valor" class="form-label">Valor</label>
                        <input type="text" class="form-control" id="valor-alterar" name="valor_alterar">
                    </div>
                    <div class="mb-3">
                        <label class="form-check-label" for="data_vencimento">Data Vencimento</label>
                        <input type="date" class="form-control" id="data-vencimento-alterar" name="data_vencimento_alterar">
                    </div>

                    <input type="hidden" name="codigo_produto_alterar" id="codigo-produto-alterar">


                </form>
                <button type="button" class="btn btn-primary mb-3" id="alteracao-pedido">Alterar</button>
            </div>

            <div class="alert alert-success" role="alert" id="mensagem-pedido-alterado">
            </div>

            <div class="alert alert-warning" role="alert" id="mensagem-falha-alterar-pedido">
            </div>

            <div class="alert alert-info" role="alert" id="mensagem-campo-vazio-alterar-pedido">
            </div>
        </div>
    </div>
</div>