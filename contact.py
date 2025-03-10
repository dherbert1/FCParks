from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Example: using Gmail
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'your-email-password'  # Your email password or app password
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'

mail = Mail(app)

# Route for the homepage where the review form is displayed
@app.route('/')
def index():
    return render_template('contact.html')

# Route to handle form submission
@app.route('/submit_review', methods=['POST'])
def submit_review():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        review = request.form['review']

        # Create the email message
        msg = Message('New Review Submitted', recipients=['your-email@example.com'])
        msg.html = f"""
        <h2>New Review from {name}</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Review:</strong></p>
        <p>{review}</p>
        """
        
        try:
            # Send the email
            mail.send(msg)
            return redirect(url_for('thank_you'))
        except Exception as e:
            return f"An error occurred: {str(e)}"

# Route for the thank you page
@app.route('/thank_you')
def thank_you():
    return "<h1>Thank you for your review! We appreciate your feedback.</h1>"

if __name__ == '__main__':
    app.run(debug=True)
