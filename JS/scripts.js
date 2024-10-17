// Navbar visibility on scroll
window.onscroll = function() {
    let navbar = document.getElementById('navbar');
    if (window.pageYOffset > 100) {
        navbar.style.top = '0';
    } else {
        navbar.style.top = '-100px';
    }
};


$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });


/*document.addEventListener('DOMContentLoaded', function () {
    const filtersMenuItems = document.querySelectorAll('.filters_menu li');
    const grid = document.querySelector('.grid');
    const gridItems = document.querySelectorAll('.all');

    // Função para filtrar os itens no grid
    function filterItems(filter) {
        gridItems.forEach(item => {
            if (filter === '*' || item.classList.contains(filter.substring(1))) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Adiciona o evento de clique para cada item no menu de filtros
    filtersMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove a classe 'active' de todos os itens
            filtersMenuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // Adiciona a classe 'active' ao item clicado
            this.classList.add('active');

            // Obtém o filtro selecionado
            const filter = this.getAttribute('data-filter');
            filterItems(filter);
        });
    });

    // Inicializa o grid
    filterItems('*'); // Mostra todos os itens inicialmente
});*/




document.addEventListener('DOMContentLoaded', function() {
    const text = "Desenvolvedor Java com experiência em Spring Framework e MySQL para soluções back-end. Também atuo no front-end com HTML, CSS e JavaScript, criando interfaces dinâmicas e integradas.";
    const typingText = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);  // Velocidade de digitação (em ms)
        }
    }

    typeWriter();  // Inicia a animação de digitação
});

