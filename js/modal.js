  // Get all necessary elements
      const projectCards = document.querySelectorAll('.project-card-trigger');
      const modalOverlay = document.getElementById('project-modal-overlay');
      const modalContent = document.getElementById('project-modal-content');
      const closeModalButton = document.getElementById('close-modal');

      const modalProjectImage = document.getElementById('modal-project-image');
      const modalProjectCategory = document.getElementById('modal-project-category');
      const modalProjectTitle = document.getElementById('modal-project-title');
      const modalProjectDescription = document.getElementById('modal-project-description');
      const modalProjectTechnologies = document.getElementById('modal-project-technologies');
      const modalProjectLink = document.getElementById('modal-project-link');

      // Function to open the modal
      function openModal(projectData) {
        // Populate modal with project data
        modalProjectImage.src = projectData.image;
        modalProjectCategory.textContent = projectData.category;
        modalProjectTitle.textContent = projectData.title;
        modalProjectDescription.textContent = projectData.description;
        modalProjectLink.href = projectData.link;

        // Clear existing technologies and add new ones
        modalProjectTechnologies.innerHTML = '';
        projectData.technologies.forEach(tech => {
          const span = document.createElement('span');
          span.className = 'text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full';
          span.textContent = tech;
          modalProjectTechnologies.appendChild(span);
        });

        // Show modal with transitions
        modalOverlay.classList.remove('hidden');
        // A small delay to ensure the browser registers the 'display: block' before applying opacity/scale
        setTimeout(() => {
          modalOverlay.classList.remove('opacity-0');
          modalContent.classList.remove('scale-95');
        }, 10);
      }

      // Function to close the modal
      function closeModal() {
        modalOverlay.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        // Wait for transition to complete before hiding
        setTimeout(() => {
          modalOverlay.classList.add('hidden');
        }, 300);
      }

      // Event listeners for opening modal (attach to "View Project" links)
      projectCards.forEach(card => {
        card.addEventListener('click', e => {
          e.preventDefault(); // Prevent default link behavior

          // Extract data from data attributes
          const projectData = {
            image: card.dataset.image,
            category: card.dataset.category,
            title: card.dataset.title,
            description: card.dataset.description,
            technologies: card.dataset.technologies.split(','), // Split string into array
            link: card.dataset.link,
          };
          openModal(projectData);
        });
      });

      // Event listener for closing modal
      closeModalButton.addEventListener('click', closeModal);

      // Close modal when clicking outside the content
      modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) {
          closeModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
          closeModal();
        }
      });