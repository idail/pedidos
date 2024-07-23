<div class="col-sm-12 col-xl-9 mt-3">
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4">Cadastrar Pedido</h6>
        <form>
            <div class="mb-3">
                <label for="nome_produto" class="form-label">Nome Produto</label>
                <input type="text" class="form-control" id="nome-produto" name="nome_produto">
            </div>
            <div class="mb-3">
                <label for="valor" class="form-label">Valor</label>
                <input type="text" class="form-control" id="valor" name="valor">
            </div>
            <div class="mb-3">
                <label class="form-check-label" for="data_vencimento">Data Vencimento</label>
                <input type="date" class="form-control" id="data-vencimento" name="data_vencimento">
            </div>
            <button type="button" class="btn btn-primary mb-3" id="gravar">Gravar</button>
        </form>

        <div class="alert alert-success" role="alert" id="mensagem-pedido-gravado">
        </div>

        <div class="alert alert-warning" role="alert" id="mensagem-falha-gravar-pedido">
        </div>

        <div class="alert alert-info" role="alert" id="mensagem-campo-vazio">
        </div>
    </div>
</div>