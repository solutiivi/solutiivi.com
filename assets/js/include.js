document.addEventListener("DOMContentLoaded", function () {
    // Part 1: Include HTML files dynamically
    const includeElements = document.querySelectorAll('[data-include]');
    const includePromises = Array.from(includeElements).map(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                el.outerHTML = content;
            } else {
                console.error(`Error loading ${file}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error loading ${file}: ${error}`);
        }
    });

    // Wait for all includes to complete before running additional scripts
    Promise.all(includePromises).then(() => {
        console.log("All includes loaded.");

        // Part 2: Scroll Animation for Sections
        const sections = document.querySelectorAll(".section-animate");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));

        // Part 3: Scroll Effect for Navbar Background
        const navbar = document.querySelector(".navbar"); // Select the navbar by its class

        if (navbar) {
            console.log("Navbar element found.");
            window.addEventListener("scroll", function () {
                if (window.scrollY > 300) { // Adjust the threshold as needed
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            });
        } else {
            console.error("Navbar element not found after loading includes.");
        }
    });
});
