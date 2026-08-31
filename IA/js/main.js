/**
 * JavaScript per als materials de formació d'IA a Primària
 * Funcionalitats: Botons de copiar prompt, quiz interactiu, menú mòbil i navegació
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Botó Copiar Prompt
  const copyButtons = document.querySelectorAll('.btn-copy');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const card = button.closest('.prompt-card');
      const promptBody = card.querySelector('.prompt-body');
      
      if (!promptBody) return;
      
      const textToCopy = promptBody.innerText.trim();
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = button.innerHTML;
        
        button.classList.add('copied');
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copiat!
        `;
        
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = originalText;
        }, 2500);
      } catch (err) {
        console.error('Error al copiar al porta-retalls:', err);
        alert('No s\'ha pogut copiar automàticament. Selecciona el text manualment.');
      }
    });
  });

  // 2. Menú Mòbil
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 3. Mini-Quiz Interactius (Comprovacions d'aprenentatge)
  const quizBoxes = document.querySelectorAll('.quiz-box');
  
  quizBoxes.forEach(box => {
    const options = box.querySelectorAll('.quiz-option');
    const feedback = box.querySelector('.quiz-feedback');
    
    options.forEach(option => {
      option.addEventListener('click', () => {
        const isCorrect = option.dataset.correct === 'true';
        const explanation = option.dataset.feedback || (isCorrect ? 'Correcte!' : 'Incorrecte. Revisa el contingut anterior.');
        
        // Reset previous state
        options.forEach(opt => {
          opt.style.borderColor = 'var(--border)';
          opt.style.background = 'white';
        });
        
        if (isCorrect) {
          option.style.borderColor = 'var(--success)';
          option.style.background = 'var(--success-light)';
          feedback.style.display = 'block';
          feedback.style.background = 'var(--success-light)';
          feedback.style.color = '#065f46';
          feedback.innerHTML = `<strong>Molt bé!</strong> ${explanation}`;
        } else {
          option.style.borderColor = 'var(--danger)';
          option.style.background = 'var(--danger-light)';
          feedback.style.display = 'block';
          feedback.style.background = 'var(--danger-light)';
          feedback.style.color = '#991b1b';
          feedback.innerHTML = `<strong>Atenció:</strong> ${explanation}`;
        }
      });
    });
  });

  // 4. ScrollSpy per a la barra lateral del mòdul
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('.content-section');
  
  if (sidebarLinks.length > 0 && sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });
      
      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
});
