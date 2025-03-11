<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input to prevent XSS and other issues
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $rating = htmlspecialchars($_POST["rating"]);
    $comments = htmlspecialchars($_POST["comments"]);

    // The email to send the review to
    $to = "benbryant20070@gmail.com"; // Your email address
    $subject = "New Review Submission";

    // Email headers
    $headers = "From: $email\r\n"; // Sender's email
    $headers .= "Reply-To: $email\r\n"; // Reply-to email
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // Set the content type for plain text

    // Compose the email message
    $message = "You have received a new review:\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Rating: $rating Stars\n";
    $message .= "Comments:\n$comments\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "success"; // If email is sent successfully
    } else {
        echo "error"; // If there is an issue sending the email
    }
} else {
    echo "Invalid request"; // If the request is not POST
}
?>
