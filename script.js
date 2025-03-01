document.addEventListener("DOMContentLoaded", function () {
    const scrollContainers = document.querySelectorAll(".scroll_portfolio, .scroll_service");

    scrollContainers.forEach(scrollContainer => {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Dragging with mouse
        scrollContainer.addEventListener("mousedown", (e) => {
            isDown = true;
            scrollContainer.classList.add("active");
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener("mouseleave", () => {
            isDown = false;
            scrollContainer.classList.remove("active");
        });

        scrollContainer.addEventListener("mouseup", () => {
            isDown = false;
            scrollContainer.classList.remove("active");
        });

        scrollContainer.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // Скорость прокрутки
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch scrolling
        let touchStartX = 0;
        let touchScrollLeft = 0;

        scrollContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener("touchmove", (e) => {
            const touchMoveX = e.touches[0].pageX;
            const move = touchStartX - touchMoveX;
            scrollContainer.scrollLeft = touchScrollLeft + move;
        });

        // Wheel and trackpad scrolling
        scrollContainer.addEventListener("wheel", (e) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY || e.deltaX;
        });
    });

    // Enable horizontal scroll for .scroll_service only on mobile
    if (scrollContainers) {
        function updateScrollBehavior() {
            if (window.innerWidth <= 1280) {
                scrollContainers.style.overflowX = "auto";
                scrollContainers.style.scrollSnapType = "x mandatory";
            } else {
                scrollContainers.style.overflowX = "visible";
                scrollContainers.style.scrollSnapType = "none";
            }
        }

        updateScrollBehavior();
        window.addEventListener("resize", updateScrollBehavior);
    }
});
