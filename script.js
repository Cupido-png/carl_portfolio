document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SCROLL TO TOP BUTTON
    ========================= */
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =========================
       LIGHTBOX / SLIDESHOW
    ========================= */
   const images = document.querySelectorAll(".lightbox-trigger");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    let currentIndex = 0;
    if (!images.length || !lightbox) return;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.style.opacity = 0;
        lightboxImg.src = images[currentIndex].src;
        lightbox.style.display = "flex";
        document.body.classList.add("lightbox-open");

        requestAnimationFrame(() => {
            lightboxImg.style.opacity = 1;
        });
    }

    function changeImage(index) {
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            currentIndex = index;
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.style.opacity = 1;
        }, 200);
    }

    function closeLightbox() {
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightbox.style.display = "none";
            document.body.classList.remove("lightbox-open");
        }, 200);
    }

    images.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });

    prevBtn.addEventListener("click", () =>
        changeImage((currentIndex - 1 + images.length) % images.length)
    );

    nextBtn.addEventListener("click", () =>
        changeImage((currentIndex + 1) % images.length)
    );

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "Escape") closeLightbox();
        }
    });
});
