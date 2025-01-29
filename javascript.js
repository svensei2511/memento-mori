document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const message = document.getElementById("message");
    const submitButton = document.getElementById("submit");

    // Generate 924 squares dynamically
    for (let i = 0; i < 924; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        grid.appendChild(square);
    }

    // Populate days dropdown
    const dayDropdown = document.getElementById("day");
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        dayDropdown.appendChild(option);
    }

    // Populate months dropdown (brojevi od 1 do 12)
    const monthDropdown = document.getElementById("month");
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        monthDropdown.appendChild(option);
    }

    // Populate years dropdown
    const yearDropdown = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1925; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearDropdown.appendChild(option);
    }

    submitButton.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const day = parseInt(document.getElementById("day").value.trim(), 10);
        const month = parseInt(document.getElementById("month").value.trim(), 10) - 1; // JavaScript months are 0-indexed
        const year = parseInt(document.getElementById("year").value.trim(), 10);

        if (!name || isNaN(day) || isNaN(month) || isNaN(year)) {
            alert("Molimo unesite ispravno ime i datum rođenja.");
            return;
        }

        const birthDate = new Date(year, month, day);
        const today = new Date();

        if (birthDate > today || birthDate.getFullYear() < 1900) {
            alert("Unesite ispravan datum rođenja.");
            return;
        }

        const monthsLived = calculateMonthsLived(birthDate, today);
        const remainingMonths = 924 - monthsLived;

        // Color the squares
        const squares = document.querySelectorAll(".square");
        squares.forEach((square, index) => {
            square.style.backgroundColor = index < monthsLived ? "red" : "#ccc";
        });

        // Display the message
        message.textContent = `${name}, cijeniš li svoje vrijeme?`;

        // Reset after 10 seconds
        setTimeout(() => {
            squares.forEach(square => square.style.backgroundColor = "#ccc");
            message.textContent = "";
            document.getElementById("name").value = "";
            document.getElementById("day").value = "";
            document.getElementById("month").value = "";
            document.getElementById("year").value = "";
        }, 10000);
    });

    function calculateMonthsLived(birthDate, today) {
        const yearsDifference = today.getFullYear() - birthDate.getFullYear();
        const monthsDifference = today.getMonth() - birthDate.getMonth();
        const daysDifference = today.getDate() - birthDate.getDate();

        let totalMonths = yearsDifference * 12 + monthsDifference;
        if (daysDifference < 0) {
            totalMonths--;
        }

        return Math.min(totalMonths, 924); // Cap at 924 months
    }
});