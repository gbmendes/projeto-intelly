$(document).ready(function () {
    $.getJSON('https://api.myjson.com/bins/10srzi', function (data) {
        
        var encomendas = data.encomendas;

        for (var encomenda of encomendas) {
            encomenda.valor = 'R$ ' + (encomenda.valor * 1.430).toFixed(2)
        }

        $('#results').DataTable({
            data : encomendas,
            lengthMenu: [[4, 10, 25, 50, -1], [4, 10, 25, 50, "All"]],
            pageLength: 4,
            columns : [
                { data : "id" },
                { data : "codigo" },
                { data : "valor" },
                { data : "entregue" },
                { data : "data" },
                { data : "cliente.id" },
                { data : "cliente.nome" }
            ],
            columnDefs: [{
                targets: 3,
                data: 'cliente.entregue',
                render: function(data, type, row, meta) {
                    return data ? "Entregue" : "Pendente";
                }
            },
            {
                targets: 6,
                data: 'cliente.nome',
                render: function (data, type, row, meta) {
                    var mensagem = row.cliente.id + ' - ' + row.cliente.nome
                    return '<a href="#" onclick="alert(\'' + mensagem + '\')" class="cliente">' + data + "</a>";
            }
            }]
        });
    })
})