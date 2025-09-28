// Project data with detailed information
const projectsData = {
  ems: {
    title: "Employee Management System (OJT)",
    meta: {
      role: "UI Designer",
      platform: "Web & Mobile",
      tools: "Figma, HTML/CSS"
    },
    description: "Designed interface screens for employee records, attendance monitoring, and report generation. Focused on clarity, readable data tables, and responsive behavior for small screens. Collaborated with developers to ensure designs were technically feasible.",
    images: [
      "images/Login.png",
      "images/Department Dashboard.png",
      "images/Admin Employee Management.png",
      "images/Admin Position Management.png",
      "images/Frame 68.png",
      "images/Android Compact - 2.png"
    ],
    features: [
      "Clean employee database interface",
      "Attendance tracking dashboard",
      "Report generation system",
      "Mobile-responsive design",
      "Role-based access controls"
    ],
    challenges: [
      "Designed data-heavy tables to be scannable and not overwhelming for HR staff.",
      "Created mobile layouts that maintained functionality while fitting smaller screens.",
      "Balanced feature accessibility with a clean, professional appearance."
    ]
  },
  thesis: {
    title: "Cemetery Information System (Thesis)",
    meta: {
      role: "UI/UX Designer",
      platform: "Web",
      tools: "Figma"
    },
    description: "Designed a clean and responsive website layout with dedicated sections for the homepage, about page, and contact page. Focused on presenting information in a clear structure with consistent styling and easy navigation for different users.",
    images: [
      "images/Hero Section p1.png",
      "images/About page.png",
      "images/Contact page.png"
    ],
    features: [
      "Hero section with introductory content",
      "About page highlighting background and details",
      "Contact page with form and information",
      "Consistent typography and color scheme"
    ],
    challenges: [
      "Balanced visual hierarchy to keep text-heavy sections easy to read.",
      "Ensured clear sectioning (Home, About, Contact) for intuitive navigation.",
      "Maintained a professional appearance while keeping the design simple and functional."
    ]
  },
  manual: {
    title: "User Manual (Thesis Documentation)",
    meta: {
      role: "Documentation Designer",
      platform: "Book/Print",
      tools: "Figma"
    },
    description: "Designed and structured the user manual for the Cemetery Information System, ensuring clear instructions and organized content flow. Focused on making the manual user-friendly for both administrators and visitors, with layouts that support readability in print and digital formats.",
    images: [
      "images/Screenshot 2025-09-19 233450.png",
      "images/Screenshot 2025-09-19 233849.png",
      "images/Screenshot 2025-09-19 233901.png"
    ],
    features: [
      "Step-by-step instructions for system navigation",
      "Visual aids and annotated screenshots",
      "Clear typography and layout for readability",
      "Sections divided by user role",
      "Printable and digital-friendly format"
    ],
    challenges: [
      "Made technical instructions easy to understand for non-technical users.",
      "Kept a long document readable with consistent hierarchy and structure.",
      "Balanced the layout for both digital PDF and printed versions."
    ]
  },
  spotify: {
    title: "Spotify Landing Page Design",
    meta: {
      role: "UI/UX Practice",
      platform: "Web",
      tools: "Figma"
    },
    description: "Recreated a Spotify-inspired interface to practice UI design fundamentals and consistency. Focused on replicating the structure of Spotify’s music library, including playlists, artists, and the player section, while experimenting with custom colors and styling for a personalized look.",
    images: [
      "images/Spotify landing page.png"
    ],
    features: [
      "Sidebar navigation for playlists, artists, and podcasts",
      "Main content area with “Made For You,” “Recently Played,” and curated sections",
      "Music player controls with progress bar",
      "Custom color scheme to differentiate from Spotify’s green branding",
      "Emphasis on spacing, alignment, and component consistency"
    ],
    challenges: [
      "Practiced recreating a complex UI while maintaining pixel alignment and hierarchy.",
      "Adjusted the color scheme to ensure readability against dark backgrounds.",
      "Focused on consistency of icons, typography, and spacing to mimic a professional product."
    ]
  }
};

// Global variables for modal state
let currentProject = null;
let currentImageIndex = 0;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add scroll animations
  addScrollAnimations();
  
  // Initialize responsive behavior
  handleResize();
});

// Project Modal Functions
function openProjectModal(projectKey) {
  currentProject = projectsData[projectKey];
  if (!currentProject) return;

  currentImageIndex = 0;
  
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalBody = document.getElementById('modalBody');

  // Set title
  modalTitle.textContent = currentProject.title;
  
  // Set meta information
  modalMeta.innerHTML = '';
  const metaItems = [
    `Role: ${currentProject.meta.role}`,
    `Platform: ${currentProject.meta.platform}`,
    `Tools: ${currentProject.meta.tools}`
  ];
  
  metaItems.forEach(item => {
    const metaElement = document.createElement('span');
    metaElement.className = 'badge badge-secondary';
    metaElement.textContent = item;
    modalMeta.appendChild(metaElement);
  });

  // Create modal content
  let contentHTML = '';
  
  // Add image carousel if available
  if (currentProject.images && currentProject.images.length > 0) {
    contentHTML += createImageCarousel(currentProject.images, currentProject.title);
  }
  
  // Create project overview section
  contentHTML += '<div class="project-overview">';
  
  // Project Overview
  contentHTML += `
    <div class="project-overview-section">
      <h3>Project Overview</h3>
      <p>${currentProject.description}</p>
    </div>
  `;
  
  // Key Features
  if (currentProject.features) {
    contentHTML += `
      <div class="project-overview-section project-features">
        <h3>Key Features</h3>
        <ul>
    `;
    currentProject.features.forEach(feature => {
      contentHTML += `<li>${feature}</li>`;
    });
    contentHTML += '</ul></div>';
  }
  
  contentHTML += '</div>'; // Close project-overview
  
  // Design Challenges & Solutions
  if (currentProject.challenges) {
    contentHTML += `
      <div class="project-challenges">
        <h3>Design Challenges & Solutions</h3>
    `;
    currentProject.challenges.forEach(challenge => {
      contentHTML += `<p>${challenge}</p>`;
    });
    contentHTML += '</div>';
  }
  
  modalBody.innerHTML = contentHTML;

  // Initialize carousel functionality if multiple images
  if (currentProject.images && currentProject.images.length > 1) {
    initializeCarousel();
  }

  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  
  // Clean up
  currentProject = null;
  currentImageIndex = 0;
}

function createImageCarousel(images, projectTitle) {
  if (!images || images.length === 0) return '';
  
  // Single image - no carousel needed
  if (images.length === 1) {
    return `
      <div class="image-carousel">
        <div class="carousel-container">
          <img src="${images[0]}" alt="${projectTitle} screenshot" class="carousel-main-image" />
        </div>
      </div>
    `;
  }
  
  // Multiple images - create carousel
  let carouselHTML = `
    <div class="image-carousel">
      <div class="carousel-container">
        <img 
          id="carouselMainImage"
          src="${images[0]}" 
          alt="${projectTitle} screenshot 1" 
          class="carousel-main-image"
        />
        
        <button class="carousel-nav carousel-prev" onclick="goToPreviousImage()" title="Previous image (← Arrow key)">
          ‹
        </button>
        <button class="carousel-nav carousel-next" onclick="goToNextImage()" title="Next image (→ Arrow key)">
          ›
        </button>
        
        <div class="carousel-counter" id="carouselCounter">
          1 / ${images.length}
        </div>
      </div>
      
      <div class="carousel-thumbnails" id="carouselThumbnails">
  `;
  
  // Add thumbnails
  images.forEach((image, index) => {
    const activeClass = index === 0 ? 'active' : '';
    carouselHTML += `
      <button 
        class="carousel-thumbnail ${activeClass}" 
        onclick="goToImage(${index})"
        data-index="${index}"
      >
        <img src="${image}" alt="${projectTitle} thumbnail ${index + 1}" />
      </button>
    `;
  });
  
  carouselHTML += `
      </div>
      
      <div class="carousel-hint">
        Use ← → arrow keys to navigate
      </div>
    </div>
  `;
  
  return carouselHTML;
}

function initializeCarousel() {
  // Keyboard navigation is handled globally
}

function updateCarouselDisplay() {
  if (!currentProject || !currentProject.images) return;
  
  const mainImage = document.getElementById('carouselMainImage');
  const counter = document.getElementById('carouselCounter');
  const thumbnails = document.querySelectorAll('.carousel-thumbnail');
  
  if (mainImage) {
    mainImage.src = currentProject.images[currentImageIndex];
    mainImage.alt = `${currentProject.title} screenshot ${currentImageIndex + 1}`;
  }
  
  if (counter) {
    counter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;
  }
  
  // Update thumbnails
  thumbnails.forEach((thumb, index) => {
    if (index === currentImageIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

function goToPreviousImage() {
  if (!currentProject || !currentProject.images) return;
  
  currentImageIndex = currentImageIndex === 0 
    ? currentProject.images.length - 1 
    : currentImageIndex - 1;
  
  updateCarouselDisplay();
}

function goToNextImage() {
  if (!currentProject || !currentProject.images) return;
  
  currentImageIndex = currentImageIndex === currentProject.images.length - 1 
    ? 0 
    : currentImageIndex + 1;
  
  updateCarouselDisplay();
}

function goToImage(index) {
  if (!currentProject || !currentProject.images) return;
  
  currentImageIndex = index;
  updateCarouselDisplay();
}

// Global keyboard event handler
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('projectModal');
  const isModalOpen = modal.style.display === 'flex';
  
  if (isModalOpen) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeProjectModal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPreviousImage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNextImage();
    }
  }
});

// Close modal when clicking backdrop
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('projectModal');
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
});

// Scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and project cards
  const cards = document.querySelectorAll('.card, .project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Header scroll effect
function initializeHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 0) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Responsive behavior
function handleResize() {
  const isMobile = window.innerWidth <= 768;
  const navLinks = document.querySelector('.nav-links');
  
  // You can add mobile-specific behavior here
  if (isMobile) {
    // Mobile-specific adjustments
  } else {
    // Desktop-specific adjustments
  }
}

// Add resize listener
window.addEventListener('resize', handleResize);

// Contact functions
function handleEmailClick() {
  window.open('https://mail.google.com/mail/?view=cm&fs=1&to=rbellosillojr@gmail.com');
}

function handleLinkedInClick() {
  window.open('https://www.linkedin.com/in/richard-jr-bellosillo-30a23a2a5/');
}

function handleDownloadResume() {
  // Placeholder for resume download
  alert('Resume download placeholder — replace with actual PDF link.');
  // window.open('/resume.pdf', '_blank');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header scroll effect
  initializeHeaderScroll();
  
  // Small delay to ensure all elements are rendered
  setTimeout(addScrollAnimations, 100);
  
  // Initialize responsive behavior
  handleResize();
});

// Add a simple loading state
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Set initial loading state
document.body.classList.add('loading');

// Console message for developers
console.log('🎨 Portfolio loaded successfully!');
console.log('💼 Built for Richard Bellosillo Jr. - Aspiring UI/UX Designer');
console.log('🚀 Ready to showcase skills to potential OJT employers');

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Replace with a placeholder or show error message
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0Y1Ii8+CjxwYXRoIGQ9Ik0yNTAgMTUwTDIwMCAxMDBIMzAwTDI1MCAxNTBaIiBmaWxsPSIjRDFENU1COSIvPgo8L3N2Zz4K';
      this.alt = 'Image failed to load';
    });
  });
});