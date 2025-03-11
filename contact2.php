<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $rating = htmlspecialchars($_POST["rating"]);
    $comments = htmlspecialchars($_POST["comments"]);
    
    // Process the form data (e.g., send email, save to database, etc.)
    
    // Simulate a successful submission for this example:
    $to = "your-email@example.com";
    $subject = "New Review Submission";
    $message = "Name: $name\nEmail: $email\nRating: $rating\nComments: $comments";
    $headers = "From: $email\r\n";
    
    // Simulate email sending
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Invalid request";
}
?>