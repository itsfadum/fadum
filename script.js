document.addEventListener("DOMContentLoaded", () => {

    /*
    =========================================
    SCROLL REVEAL
    =========================================
    */

    const elements = document.querySelectorAll(".reveal");


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    elements.forEach((element) => {

        observer.observe(element);

    });


    /*
    =========================================
    HOME PHOTO CAROUSEL
    =========================================
    */

    const carousel = document.querySelector(".home-carousel");

    if (!carousel) {
        return;
    }


    const photos = Array.from(
        carousel.querySelectorAll(".home-carousel-photo")
    );


    const prevButton = carousel.querySelector(
        ".home-carousel-prev"
    );


    const nextButton = carousel.querySelector(
        ".home-carousel-next"
    );


    const counter = carousel.querySelector(
        ".home-carousel-counter"
    );


    const lightbox = document.querySelector(
        ".home-lightbox"
    );


    const lightboxImage = document.querySelector(
        ".home-lightbox-image"
    );


    const lightboxCounter = document.querySelector(
        ".home-lightbox-counter"
    );


    const lightboxClose = document.querySelector(
        ".home-lightbox-close"
    );


    const lightboxPrev = document.querySelector(
        ".home-lightbox-prev"
    );


    const lightboxNext = document.querySelector(
        ".home-lightbox-next"
    );


    let currentIndex = 0;


    /*
    -----------------------------------------
    GET IMAGE
    -----------------------------------------
    */

    const getImageSource = (index) => {

        const image = photos[index].querySelector("img");

        return image
            ? image.src
            : "";

    };


    /*
    -----------------------------------------
    UPDATE CAROUSEL
    -----------------------------------------
    */

    const updateCarousel = (index) => {

        currentIndex =
            (index + photos.length) %
            photos.length;


        photos.forEach((photo, photoIndex) => {

            photo.classList.remove(
                "is-active",
                "is-left",
                "is-right",
                "is-hidden"
            );


            const difference =
                (photoIndex - currentIndex + photos.length) %
                photos.length;


            if (difference === 0) {

                photo.classList.add("is-active");

            }

            else if (
                difference === 1 ||
                difference === -(photos.length - 1)
            ) {

                photo.classList.add("is-right");

            }

            else if (
                difference === photos.length - 1 ||
                difference === -1
            ) {

                photo.classList.add("is-left");

            }

            else {

                photo.classList.add("is-hidden");

            }

        });


        const displayNumber =
            String(currentIndex + 1).padStart(2, "0");


        counter.textContent =
            `${displayNumber} / ${String(photos.length).padStart(2, "0")}`;

    };


    /*
    -----------------------------------------
    NEXT / PREVIOUS
    -----------------------------------------
    */

    const nextPhoto = () => {

        updateCarousel(currentIndex + 1);

    };


    const previousPhoto = () => {

        updateCarousel(currentIndex - 1);

    };


    nextButton.addEventListener(
        "click",
        nextPhoto
    );


    prevButton.addEventListener(
        "click",
        previousPhoto
    );


    /*
    -----------------------------------------
    CLICKING PHOTOS
    -----------------------------------------
    */

    photos.forEach((photo, index) => {

        photo.addEventListener(
            "click",
            () => {

                if (index === currentIndex) {

                    openLightbox(index);

                    return;

                }


                updateCarousel(index);

            }
        );

    });


    /*
    =========================================
    LIGHTBOX
    =========================================
    */

    const openLightbox = (index) => {

        if (!lightbox) {
            return;
        }


        currentIndex =
            (index + photos.length) %
            photos.length;


        lightboxImage.src =
            getImageSource(currentIndex);


        const displayNumber =
            String(currentIndex + 1).padStart(2, "0");


        lightboxCounter.textContent =
            `${displayNumber} / ${String(photos.length).padStart(2, "0")}`;


        lightbox.classList.add("is-open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    };


    const closeLightbox = () => {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );

    };


    const updateLightbox = (index) => {

        currentIndex =
            (index + photos.length) %
            photos.length;


        lightboxImage.src =
            getImageSource(currentIndex);


        const displayNumber =
            String(currentIndex + 1).padStart(2, "0");


        lightboxCounter.textContent =
            `${displayNumber} / ${String(photos.length).padStart(2, "0")}`;


        updateCarousel(currentIndex);

    };


    const nextLightbox = () => {

        updateLightbox(currentIndex + 1);

    };


    const previousLightbox = () => {

        updateLightbox(currentIndex - 1);

    };


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            nextLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            previousLightbox
        );

    }


    /*
    -----------------------------------------
    CLICK OUTSIDE IMAGE
    -----------------------------------------
    */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /*
    -----------------------------------------
    KEYBOARD CONTROLS
    -----------------------------------------
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox ||
                !lightbox.classList.contains("is-open")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowRight") {

                nextLightbox();

            }


            if (event.key === "ArrowLeft") {

                previousLightbox();

            }

        }
    );


    /*
    -----------------------------------------
    TOUCH / SWIPE
    -----------------------------------------
    */

    let touchStartX = 0;

    let touchEndX = 0;


    const handleSwipe = () => {

        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) < 50) {
            return;
        }


        if (distance < 0) {

            nextPhoto();

        }

        else {

            previousPhoto();

        }

    };


    carousel.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

        },
        {
            passive: true
        }
    );


    /*
    =========================================
    INITIAL STATE
    =========================================
    */

    updateCarousel(0);

});