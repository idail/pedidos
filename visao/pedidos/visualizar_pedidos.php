<div class="col-9 mt-5">

    <div class="col-sm-12 col-xl-12">
        <div class="bg-light rounded h-100 p-4">
            <h6 class="mb-4 text-center">Categorizar</h6>
            <select class="form-select form-select-sm mb-3" aria-label=".form-select-sm example" id="selecao-data">
                <option selected value="selecione">Selecione</option>
                <option value="vencido">Estão vencidos</option>
                <option value="vencer_aproximado">Vencimento a três dias</option>
                <option value="vencer_maior_3">Vencimento superior a três dias</option>
            </select>
        </div>
    </div>
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4 text-center">Pedidos</h6>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nome Produto</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Data Vencimento</th>
                        <th scope="col" colspan="3">Opções</th>
                    </tr>
                </thead>
                <tbody id="lista-pedidos">

                </tbody>
            </table>
        </div>
    </div>

    <div class="alert alert-warning mt-3" role="alert" id="mensagem-falha-listar-pedidos">
    </div>

    <div class="alert alert-info mt-3" role="alert" id="mensagem-campo-vazio-listar-pedidos">
    </div>
</div>