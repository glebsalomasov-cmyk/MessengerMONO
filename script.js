document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. SETUP ZOOM LENS (BACKGROUND SHIFT METHOD)
    const lensContainer = document.querySelector('.lens-container');
    const lensView = document.querySelector('.lens-view');
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const easing = 0.1; 

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateLens() {
        // Smooth movement
        targetX += (mouseX - targetX) * easing;
        targetY += (mouseY - targetY) * easing;

        // Move the container circle
        lensContainer.style.transform = `translate(${targetX}px, ${targetY}px)`;
        
        // CALCULATE BACKGROUND POSITION FOR THE LENS VIEW
        // The idea: Inside the lens, we show a zoomed-in part of the page.
        // To do this via CSS background, we need to set background-size larger than viewport
        // and shift background-position so the point under mouse is centered.
        
        const scrollY = window.scrollY;
        const docHeight = document.body.scrollHeight;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        
        // Position of mouse in DOCUMENT coordinates
        const docMouseX = targetX;
        const docMouseY = targetY + scrollY;

        // Zoom Factor
        const zoom = 2.5; 
        
        // Background Size should be Viewport * Zoom
        const bgWidth = winW * zoom;
        const bgHeight = docHeight * zoom; // Height scales with total document height
        
        // To center the mouse point in the lens:
        // The lens is size L. Center of lens is L/2.
        // We want the pixel at (docMouseX, docMouseY) to appear at (L/2, L/2) inside the lens view.
        // But since the lens view IS the background layer...
        
        // Actually, simpler approach for "Real Lens":
        // We can't easily clone dynamic HTML into a background image without libraries like html2canvas.
        // HOWEVER, for a static-feeling premium site, we often just zoom the CONTENT behind it?
        // No, that breaks layout.
        
        // BEST PRACTICE FOR THIS DEMO:
        // Let's assume the "Lens" shows a cropped, scaled version of the BODY'S BACKGROUND IMAGE IF IT EXISTS.
        // If the body has no global background image, this effect won't work perfectly visually for text/images.
        
        // ALTERNATIVE: Use `transform: scale()` on a CLONE of the body, BUT fix the positioning bug.
        // Let's stick to the Clone method but FIX the math properly.
        
        requestAnimationFrame(animateLens);
    }
    
    // RE-IMPLEMENTING CLONE METHOD WITH FIXED MATH (More reliable for text/content)
    // Clear previous attempts
    lensView.innerHTML = ''; 
    
    // Clone Body
    const bodyClone = document.body.cloneNode(true);
    // Remove scripts/styles from clone to avoid issues
    bodyClone.querySelectorAll('script').forEach(s => s.remove());
    bodyClone.querySelectorAll('style').forEach(s => s.remove());
    bodyClone.querySelectorAll('link[rel="stylesheet"]').forEach(l => l.remove());
    
    // Wrap clone in a container that we will scale
    const cloneWrapper = document.createElement('div');
    cloneWrapper.id = 'clone-wrapper';
    cloneWrapper.appendChild(bodyClone);
    lensView.appendChild(cloneWrapper);

    // Styles for the clone wrapper
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        #clone-wrapper {
            position: absolute;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
            transform-origin: 0 0;
            pointer-events: none;
            /* Ensure fonts load in clone if possible, though tricky without link tags */
        }
    `;
    document.head.appendChild(styleTag);

    function animateLensFixed() {
        targetX += (mouseX - targetX) * easing;
        targetY += (mouseY - targetY) * easing;

        lensContainer.style.transform = `translate(${targetX}px, ${targetY}px)`;
        
        const scrollY = window.scrollY;
        const zoom = 2.5;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        
        // Mouse pos in Doc
        const docX = targetX;
        const docY = targetY + scrollY;

        // We want the point (docX, docY) to be at the CENTER of the lens.
        // The lens is positioned at (targetX, targetY) on screen.
        // The clone is scaled by `zoom`.
        
        // Transform logic:
        // 1. Scale everything up.
        // 2. Translate so that (docX, docY) maps to (winW/2, winH/2) in the viewport coordinate system of the lens?
        // No, the lens container is already moved to (targetX, targetY).
        // So inside the lens container (which is size ~120px), we want the center to correspond to (docX, docY).
        
        // Let's calculate translation needed for the inner content (#clone-wrapper)
        // Current Visual Pos of Point P = (P.x * Zoom) + TransX
        // We want Visual Pos of P to be equal to Lens Center Relative to Wrapper Origin.
        // Wait, the wrapper is INSIDE the lens container.
        // Lens Container Top-Left is at (targetX - 60, targetY - 60) approx.
        // Center of Lens is (targetX, targetY).
        
        // Simple Math:
        // TransX = (WinW / 2) - (DocX * Zoom) -> This centers it in the WINDOW.
        // But we are moving the container TO the mouse.
        
        // Correct Formula for "Follow Mouse Lens":
        // The content inside must move OPPOSITE to the mouse, scaled.
        
        const transX = -(docX * zoom) + (winW / 2);
        const transY = -(docY * zoom) + (winH / 2);
        
        // Apply to the clone wrapper
        const wrapper = document.getElementById('clone-wrapper');
        if(wrapper) {
            wrapper.style.transform = `scale(${zoom}) translate(${transX}px, ${transY}px)`;
        }

        requestAnimationFrame(animateLensFixed);
    }
    
    animateLensFixed();

    // Hover states
    const interactives = document.querySelectorAll('a, button, .story-block');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => lensContainer.classList.add('active'));
        el.addEventListener('mouseleave', () => lensContainer.classList.remove('active'));
    });

    // 2. SCROLL ANIMATIONS
    
    // Hero Text Reveal
    const heroTitle = document.querySelector('.hero-section h1');
    if(heroTitle) {
         const words = heroTitle.innerText.split(' ');
         heroTitle.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
         
         gsap.fromTo(".word", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power3.out", delay: 0.2 }
        );
    }

    gsap.from(".subtext", { y: 20, opacity: 0, duration: 1, delay: 0.8, ease: "power2.out" });
    gsap.from(".hero-actions", { y: 20, opacity: 0, duration: 1, delay: 1.0, ease: "power2.out" });

    // Parallax Images
    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Story Blocks Fade In
    gsap.utils.toArray('.story-block, .split-story-row').forEach(block => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
});