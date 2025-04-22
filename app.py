from flask import Flask, render_template , send_from_directory
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__,
            static_folder=BASE_DIR / "static",
            template_folder=BASE_DIR / "templates")

LOCALES_DIR = BASE_DIR / "locales"

@app.route("/locales/<path:filename>")
def locales_static(filename):
    return send_from_directory(LOCALES_DIR, filename)


@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True , host="0.0.0.0" , port=8000)