document.addEventListener('DOMContentLoaded', function() {
    const PRECOS = {
        inteira: 50.00,
        meia: 25.00,
        vip: 120.00
    };

    const secaoFormulario = document.getElementById('secao-formulario');
    const btnsDetalhes = document.querySelectorAll('.detalhes-btn'); 
    
    const spanLugares = document.getElementById('lugares-disponiveis');
    const spanFilmeSelecionado = document.getElementById('filme-selecionado');
    const spanDetalhesFilme = document.getElementById('detalhes-filme-selecionado');

    const selectTipo = document.getElementById('tipo');
    const inputQuantidade = document.getElementById('quantidade');
    const spanTotalPagar = document.getElementById('total-a-pagar');
    const formIngressos = document.getElementById('form-ingressos');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputCpf = document.getElementById('cpf');

    function calcularTotal() {
        const quantidade = parseInt(inputQuantidade.value) || 1; 
        const tipo = selectTipo.value;
        
        let precoUnitario = 0;

        if(PRECOS[tipo]) {
            precoUnitario = PRECOS[tipo];
        }

        const total = precoUnitario * quantidade;
        spanTotalPagar.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    if (selectTipo && inputQuantidade) {
        selectTipo.addEventListener('change', calcularTotal);
        inputQuantidade.addEventListener('input', calcularTotal);
    }

    btnsDetalhes.forEach(button => {
        button.addEventListener('click', function() {
            
            if (secaoFormulario) {
                const card = this.closest('.filme-card'); 

                const titulo = card.querySelector('h3').textContent;
                const detalhes = card.querySelector('.detalhe-info').textContent;
                const lugares = this.dataset.lugares; 

                spanFilmeSelecionado.textContent = titulo;
                spanLugares.textContent = `${lugares} assentos`;
                spanDetalhesFilme.textContent = detalhes;
                
                secaoFormulario.style.display = 'block'; 
                secaoFormulario.scrollIntoView({ behavior: 'smooth' }); 

                formIngressos.reset();
                calcularTotal(); 

            } else {
                 console.error("Erro fatal: A seção do formulário não foi encontrada.");
            }
        });
    });

    const filmes = document.querySelectorAll('.filme-card');
    const filtroGenero = document.getElementById('filtro-genero');
    const filtroIdade = document.getElementById('filtro-idade');
    const filtroCinema = document.getElementById('filtro-cinema');

    function aplicarFiltros() {
        const genero = filtroGenero.value;
        const idade = filtroIdade.value;
        const cinema = filtroCinema.value;

        filmes.forEach(filme => {
            const passaGenero = (genero === 'todos' || genero === filme.dataset.genero);
            const passaIdade = (idade === 'todas' || idade === filme.dataset.idade);
            const passaCinema = (cinema === 'todos' || cinema === filme.dataset.cinema);

            filme.style.display = (passaGenero && passaIdade && passaCinema) ? 'block' : 'none';
        });
    }

    filtroGenero.addEventListener('change', aplicarFiltros);
    filtroIdade.addEventListener('change', aplicarFiltros);
    filtroCinema.addEventListener('change', aplicarFiltros);

    if (formIngressos) {
        formIngressos.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nome = inputNome.value;
            const email = inputEmail.value;
            const cpf = inputCpf.value;
            const totalPagar = spanTotalPagar.textContent;
            const filme = document.getElementById('filme-selecionado').textContent;
            const assentos = document.getElementById('lugares-assento');

            alert(`
                🎉 Compra de Ingressos Concluída (Simulação)!

                Filme: ${filme}
                ------------------------------------
                Nome: ${nome}
                E-mail: ${email}
                CPF: ${cpf}
                Assento(s) Escolhido(s): ${assentos}}
                ------------------------------------
                Total Pago: ${totalPagar}
                
                ✅ OBRIGADO PELA COMPRA!
            `);

            formIngressos.reset();
            secaoFormulario.style.display = 'none';
        });
    }
    
});

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const email = document.getElementById("email").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const genero = document.getElementById("genero").value;

  if (!nome || !cep || !email || !idade || !genero) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  alert(`Cadastro realizado com sucesso para: ${nome}`);
  this.reset();
});
