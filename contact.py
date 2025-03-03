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