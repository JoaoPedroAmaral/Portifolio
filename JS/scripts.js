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
