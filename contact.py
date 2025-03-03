from flask import Flask, request, render_template_string, redirect, url_for
import re

app = Flask(__name__)

@app.route('/')
def form():
    return '''
        <form action="/submit" method="post">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required><br>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" required></textarea><br>
            <input type="submit" value="Submit">
        </form>
    '''

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Validate the form data
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return "Invalid email, please go back and enter a valid email."

    if not name.strip():
        return "Name is required, please go back and fill out the name field."

    if not message.strip():
        return "Message is required, please go back and fill out the message field."

    return render_template_string('''
        <h1>Thank You!</h1>
        <p>Your name: {{name}}</p>
        <p>Your email: {{email}}</p>
        <p>Your message: {{message}}</p>
    ''', name=name, email=email, message=message)

if __name__ == '__main__':
    app.run(debug=True)
    
    
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Mailtrap credentials and server configuration
smtp_server = 'live.smtp.mailtrap.io'
smtp_port = 587
smtp_username = 'api'
smtp_password = 'your_mailtrap_password'

# Email content setup
sender_email = "from@example.com"
receiver_email = "weavertyler1022@gmail.com"
subject = "Python Contact Form Test"
body = "This is a test email from the Python contact form."

# Create a multipart message and set headers
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject

# Add body to email
message.attach(MIMEText(body, "plain"))

# Connect to Mailtrap server and send email
try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.login(smtp_username, smtp_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
    print("Email sent successfully!")
except Exception as e:
    print(f"Failed to send email: {e}")