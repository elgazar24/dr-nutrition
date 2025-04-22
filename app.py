from flask import Flask, render_template
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__,
            static_folder=BASE_DIR / "static",
            template_folder=BASE_DIR / "templates")

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True , host="0.0.0.0" , port=8000)