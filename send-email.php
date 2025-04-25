<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Set the recipient email address
    $to = "benbryant20070@gmail.com";
    $subject = "New Contact Form Message";
    
    // Build the email content
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    
    // Set the email headers
    $headers = "From: $email" . "\r\n" . "Reply-To: $email" . "\r\n";
    
    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href = 'thank-you.html';</script>";
    } else {
        echo "<script>alert('There was an error sending the message. Please try again later.'); window.history.back();</script>";
    }
}
?>
