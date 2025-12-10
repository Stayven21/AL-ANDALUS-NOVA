// Gallery Configuration
const galleryConfig = {
    items: [
        {
            img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60",
            title: "Modern Exhibition Stand Design",
            desc: "Innovative stand at Dubai World Trade Center featuring interactive displays and sustainable materials"
        },
        {
            img: "https://images.unsplash.com/photo-1492684223066-e-d23140edf6d?w-800&auto=format&fit=crop&q=60",
            title: "Corporate Exhibition Booth",
            desc: "Premium design solution for international tech conference with integrated meeting rooms"
        },
        {
            img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60",
            title: "Luxury Showroom Design",
            desc: "High-end automotive exhibition stand with custom lighting and premium finishes"
        },
        {
            img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop&q=60",
            title: "Interactive Exhibition Space",
            desc: "Engaging visitor experience with digital integration and immersive technology"
        },
        {
            img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60&h=600",
            title: "Minimalist Design Concept",
            desc: "Clean lines and elegant presentation for luxury brand showcase"
        },
        {
            img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&auto=format&fit=crop&q=60",
            title: "Office Fit-Out Project",
            desc: "Modern workspace transformation with ergonomic design solutions"
        },
        {
            img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
            title: "Conference Stage Design",
            desc: "Professional setup for corporate events with advanced audio-visual systems"
        },
        {
            img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=60",
            title: "Retail Space Design",
            desc: "Innovative retail exhibition concept with flexible display systems"
        },
        {
            img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=60",
            title: "Modular Exhibition System",
            desc: "Reusable and flexible stand solution for multiple events"
        },
        {
            img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60",
            title: "Premium Hospitality Suite",
            desc: "Luxury VIP area for international exhibitions with private meeting facilities"
        }
    ],
    
    // Initialize gallery
    init: function() {
        this.createGalleryHTML();
        this.setupEventListeners();
    },
    
    // Create gallery HTML structure
    createGalleryHTML: function() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        let galleryHTML = '';
        
        this.items.forEach((item, index) => {
            galleryHTML += `
                <div class="gallery-item" data-aos="fade-up" data-aos-delay="${index * 100}" data-index="${index}">
                    <img src="${item.img}" alt="${item.title}" class="gallery-img">
                    <div class="gallery-overlay">
                        <h3>${item.title.split(' ').slice(0, 3).join(' ')}</h3>
                        <p>${item.desc.split(' ').slice(0, 10).join(' ')}...</p>
                    </div>
                    <div class="gallery-icon">
                        <i class="fas fa-expand-alt"></i>
                    </div>
                </div>
            `;
        });
        
        galleryGrid.innerHTML = galleryHTML;
        
        // Create lightbox HTML if not exists
        if (!document.getElementById('galleryLightbox')) {
            const lightboxHTML = `
                <div class="lightbox" id="galleryLightbox">
                    <button class="lightbox-close" id="lightboxClose">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    
                    <div class="lightbox-content">
                        <img id="lightboxImage" src="" alt="" class="lightbox-img">
                        <div class="lightbox-info">
                            <h3 id="lightboxTitle"></h3>
                            <p id="lightboxDesc"></p>
                        </div>
                    </div>
                    
                    <button class="lightbox-nav lightbox-next" id="lightboxNext">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }
    },
    
    // Setup event listeners
    setupEventListeners: function() {
        // Gallery item clicks
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Lightbox controls
        document.getElementById('lightboxClose')?.addEventListener('click', () => this.closeLightbox());
        document.getElementById('lightboxNext')?.addEventListener('click', () => this.nextImage());
        document.getElementById('lightboxPrev')?.addEventListener('click', () => this.prevImage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowRight') this.nextImage();
            if (e.key === 'ArrowLeft') this.prevImage();
        });
        
        // Close lightbox when clicking outside
        document.getElementById('galleryLightbox')?.addEventListener('click', (e) => {
            if (e.target.id === 'galleryLightbox') {
                this.closeLightbox();
            }
        });
    },
    
    // Lightbox functions
    currentImageIndex: 0,
    
    openLightbox: function(index) {
        this.currentImageIndex = index;
        this.updateLightbox();
        document.getElementById('galleryLightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeLightbox: function() {
        document.getElementById('galleryLightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    updateLightbox: function() {
        const item = this.items[this.currentImageIndex];
        document.getElementById('lightboxImage').src = item.img;
        document.getElementById('lightboxImage').alt = item.title;
        document.getElementById('lightboxTitle').textContent = item.title;
        document.getElementById('lightboxDesc').textContent = item.desc;
    },
    
    nextImage: function() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.items.length;
        this.updateLightbox();
    },
    
    prevImage: function() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.items.length) % this.items.length;
        this.updateLightbox();
    }
};

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    galleryConfig.init();
});