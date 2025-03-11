<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $rating = htmlspecialchars($_POST["rating"]);
    $comments = htmlspecialchars($_POST["comments"]);

    // Your email address
    $to = "benbryant20070@gmail.com";
    $subject = "New Review Submission";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Compose the message
    $message = "You have received a new review:\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Rating: $rating Stars\n";
    $message .= "Comments:\n$comments\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "success";  // Return success response if email was sent
    } else {
        echo "error";  // Return error response if email failed
    }
} else {
    echo "Invalid request.";  // Handle invalid requests
}
?>
