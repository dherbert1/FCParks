<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $review = htmlspecialchars($_POST['review']);
    
    // Email settings
    $to = "weavertyler1022@gmail.com"; // Replace with your email address
    $subject = "New Review Submitted";
    
    // Construct the email message
    $message = "
    <html>
    <head>
        <title>New Review</title>
    </head>
    <body>
        <h2>New Review from $name</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Review:</strong></p>
        <p>$review</p>
    </body>
    </html>
    ";
    
    // Set content-type header for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    
    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for your review!";
    } else {
        echo "There was an issue submitting your review. Please try again.";
    }
}
?>
