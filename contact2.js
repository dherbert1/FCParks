document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent traditional form submission

    var formData = new FormData(this);  // Collect form data

    // Send data asynchronously via fetch
    fetch("contact2.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())  // Get the response text from PHP
    .then(data => {
        if (data === "success") {
            document.getElementById("message").textContent = "Thank you for your review!";
            document.getElementById("message").style.color = "green";
            document.getElementById("message").style.display = "block";
            document.getElementById("reviewForm").reset();  // Reset form fields
        } else {
            document.getElementById("message").textContent = "Error sending review.";
            document.getElementById("message").style.color = "red";
            document.getElementById("message").style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);  // Log any errors
    });
});
