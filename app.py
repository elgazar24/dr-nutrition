from flask import Flask, render_template , send_from_directory , request ,url_for , redirect ,flash
from pathlib import Path

from flask import jsonify
from datetime import datetime
from api import api as api_blueprint



BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__,
            static_folder=BASE_DIR / "static",
            template_folder=BASE_DIR / "templates")

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

LOCALES_DIR = BASE_DIR / "locales"


app.register_blueprint(api_blueprint)


@app.route("/locales/<path:filename>")
def locales_static(filename):
    return send_from_directory(LOCALES_DIR, filename)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/book_consultation" , methods=["GET"])
def book_consultation(): 
    """Render the consultation booking page"""
    # Get today's date for the min attribute of the date input
    today_date = datetime.now().strftime('%Y-%m-%d')
    
    # You can fetch actual data from your database if needed
    # For example, getting available consultation types from the database
    # consultation_types = ConsultationType.query.all()
    
    return render_template(
        'book_consultation/book_consultation.html',
        today_date=today_date
    )

@app.route("/book_consultation" , methods=["POST"])
def book_consultation_post():
    """Process consultation booking form submission"""
    try:
        # Extract form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        consultation_type = request.form.get('consultation_type')
        preferred_date = request.form.get('preferred_date')
        preferred_time = request.form.get('preferred_time')
        health_concerns = request.form.get('health_concerns')
        new_patient = True if request.form.get('new_patient') == 'yes' else False
        
        # Convert preferred_date string to datetime object
        preferred_date = datetime.strptime(preferred_date, '%Y-%m-%d').date()
        
        # Check if date is valid (not in the past and not on weekends)
        today = datetime.now().date()
        if preferred_date < today:

            return redirect(url_for('/book_consultation'))
        
        # # Check if the patient already exists in the database
        # patient = Patient.query.filter_by(email=email).first()
        
        # if not patient:
        #     # Create a new patient if they don't exist
        #     patient = Patient(
        #         name=name,
        #         email=email,
        #         phone=phone,
        #         created_at=datetime.now()
        #     )
        #     db.session.add(patient)
        #     db.session.commit()
        
        # # Create the consultation
        # consultation = Consultation(
        #     patient_id=patient.id,
        #     consultation_type=consultation_type,
        #     preferred_date=preferred_date,
        #     preferred_time=preferred_time,
        #     health_concerns=health_concerns,
        #     status='pending',  # Default status
        #     created_at=datetime.now()
        # )
        
        # db.session.add(consultation)
        # db.session.commit()
        
        # Send confirmation email (implement this function separately)
        # send_confirmation_email(patient.email, consultation)
        
        flash('Your consultation has been successfully booked! We will confirm your appointment shortly.', 'success')
        return redirect(url_for('booking_confirmation' ))#, consultation_id=consultation.id))
        
    except Exception as e:
        app.logger.error(f"Booking error: {str(e)}")
        return redirect(url_for('book_consultation'))


@app.errorhandler(404)
def page_not_found(e):
    return render_template( 'errors/404/404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template( 'errors/500/500.html' ), 500






if __name__ == "__main__":
    app.run(debug=True , host="0.0.0.0" , port=8000)