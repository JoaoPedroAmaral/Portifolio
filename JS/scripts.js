// Navbar visibility on scroll
window.onscroll = function() {
    let navbar = document.getElementById('navbar');
    if (window.pageYOffset > 100) {
        navbar.style.top = '0';
    } else {
        navbar.style.top = '-100px';
    }
};

function filterProjects(category) {
    let projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}


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

