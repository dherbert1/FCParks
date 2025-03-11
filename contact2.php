<form id="reviewForm" action="send_review.php" method="POST">
<?php include '{contact2.html}'; ?>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST["name"]);
        $email = htmlspecialchars($_POST["email"]);
        $rating = htmlspecialchars($_POST["rating"]);
        $comments = htmlspecialchars($_POST["comments"]);
    
        $to = "tweaver27@fccsc.net"; // Replace with your email
        $subject = "New Review Submission";
        $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    
        $message = "You have received a new review:\n\n";
        $message .= "Name: $name\n";
        $message .= "Email: $email\n";
        $message .= "Rating: $rating Stars\n";
        $message .= "Comments:\n$comments\n";
    
        if (mail($to, $subject, $message, $headers)) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        echo "Invalid request.";
    }
    ?>
    
