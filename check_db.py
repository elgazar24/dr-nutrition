import psycopg2
from psycopg2 import OperationalError

def create_connection():
    try:
        conn = psycopg2.connect(
            database="dr_nawal",
            user="db_admin",
            password="Yasser@01010815084#Nawal",
            host="localhost",
            port="5432"  # Default is 5432
        )
        print("Successfully connected to PostgreSQL on M1 Mac!")
        return conn
    except OperationalError as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

# Test the connection
connection = create_connection()
if connection:
    connection.close()