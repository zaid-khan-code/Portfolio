// CV Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById("cvScrollTop");
    const progressBar = document.getElementById("cvReadingProgress");

    if (scrollTopBtn && progressBar) {
        window.addEventListener("scroll", function () {
            // Show/hide scroll to top button
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }

            // Update reading progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });

        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Print CV functionality
    const printCvBtn = document.getElementById("printCvBtn");
    if (printCvBtn) {
        printCvBtn.addEventListener("click", function () {
            window.print();
        });
    }

    // Skills toggle functionality
    function setupSkillsToggle(listBtn, barBtn, container) {
        if (!listBtn || !barBtn || !container) {
            console.error("Missing required elements for skills toggle");
            return;
        }

        // Create progress bars in container
        function createSkillBars() {
            const skillItems = container.querySelectorAll(".cv-skill-list li");

            skillItems.forEach(function (item) {
                const skillLevel = item.querySelector(".cv-skill-level");
                if (!skillLevel) return;

                const value = skillLevel.getAttribute("data-value");
                if (!value) return;

                // Only create if doesn't exist yet
                if (!item.querySelector(".skill-progress-container")) {
                    // Create progress bar container
                    const progressContainer = document.createElement("div");
                    progressContainer.className = "skill-progress-container";

                    // Create progress bar
                    const progressBar = document.createElement("div");
                    progressBar.className = "skill-progress-bar";
                    progressBar.style.width = "0%";

                    // Create value label
                    const progressValue = document.createElement("span");
                    progressValue.className = "skill-progress-value";
                    progressValue.textContent = value + "%";

                    // Append elements
                    progressBar.appendChild(progressValue);
                    progressContainer.appendChild(progressBar);
                    item.appendChild(progressContainer);
                }
            });
        }

        // Animate progress bars
        function animateSkillBars() {
            const progressBars = container.querySelectorAll(".skill-progress-bar");

            progressBars.forEach(function (bar) {
                const valueElement = bar.querySelector(".skill-progress-value");
                if (!valueElement) return;

                const value = valueElement.textContent.replace("%", "");
                setTimeout(function () {
                    bar.style.width = value + "%";
                }, 100);
            });
        }

        // Bar view button click handler
        barBtn.addEventListener("click", function () {
            // Update button states
            listBtn.classList.remove("active");
            barBtn.classList.add("active");

            // Update view
            createSkillBars();
            container.classList.remove("list-view");
            container.classList.add("bar-view");

            // Animate bars with delay
            setTimeout(animateSkillBars, 100);
        });

        // List view button click handler
        listBtn.addEventListener("click", function () {
            // Update button states
            barBtn.classList.remove("active");
            listBtn.classList.add("active");

            // Update view
            container.classList.remove("bar-view");
            container.classList.add("list-view");
        });

        // Initialize print handler
        window.addEventListener("beforeprint", function () {
            createSkillBars();
            container.classList.remove("list-view");
            container.classList.add("bar-view");
            animateSkillBars();
        });
    }

    // Setup Technical Skills toggle
    setupSkillsToggle(
        document.getElementById("listViewBtn"),
        document.getElementById("barViewBtn"),
        document.querySelector(".cv-skills")
    );

    // Setup Future Learning Skills toggle
    setupSkillsToggle(
        document.getElementById("futureListViewBtn"),
        document.getElementById("futureBarViewBtn"),
        document.querySelector(".cv-future-skills")
    );
}); 