from datetime import datetime
from flask import Flask, render_template
from . import app
import re, json, os

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about/")
def about():
    return render_template("about.html")

@app.route("/contact/")
def contact():
    return render_template("contact.html")

@app.route("/hello/")
@app.route("/hello/<name>")
def hello(name = None):
    return render_template(
        "hello.html",
        name=name,
        date=datetime.now()
    )

@app.route("/apidata")
def jdata():
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'static\\data.json')
    file=file_path.replace('\\' ,'/')
    with open(file, "r") as read_it: 
        data = json.load(read_it)
    return render_template(
        "data.html",
        jd=data
    )

@app.route("/api/data")
def get_data():
    return app.send_static_file("data.json")

@app.route('/hello/api/<name>')
def helloapi(name):
    now=datetime.now()
    formatted_now=now.strftime("%A, %d %B, %Y at %X")
    match_object = re.match("[a-zA-Z]+", name)
    if match_object:
        clean_name = match_object.group(0)
    else:
        clean_name = "Friend"
    content = "Hello there, " + clean_name + "! It's " + formatted_now
    return content