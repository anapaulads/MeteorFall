document.addEventListener('DOMContentLoaded', () => {nteúdo
    const navLinks = document.querySelectorAll('.page-nav a');
    const sections = document.querySelectorAll('.content-block');


    const activateLinkOnScroll = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
     
            if (pageYOffset >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
    
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateLinkOnScroll);

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
       
                window.scrollTo({
                    top: targetSection.offsetTop - 100, 
                    behavior: 'smooth'
                });
            }
        });
    });
});