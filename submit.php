<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize form data
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    // Your email address
    $to = "weavertyler1022@gmail.com";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Full message
    $fullMessage = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    // Send email
    $success = mail($to, $subject, $fullMessage, $headers);

    if ($success) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Error: Unable to send message.";
    }
} else {
    echo "Invalid request.";
}
?>
