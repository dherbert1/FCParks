
document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch("send_review.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                document.getElementById("message").textContent = "Thank you for your review!";
                document.getElementById("message").style.color = "green";
                document.getElementById("message").style.display = "block";
                document.getElementById("reviewForm").reset();
            } else {
                document.getElementById("message").textContent = "Error sending review.";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").style.display = "block";
            }
        })
        .catch(error => console.error("Error:", error));
});

