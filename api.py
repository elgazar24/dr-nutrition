from flask import jsonify , request , Blueprint

api = Blueprint("api", __name__)


# Define your API routes
@api.route("/api/subscription-packages", methods=["GET"])
def get_top_subscription_packages():
    return (
        jsonify(
            [
                {
                    "subscription_type_id": 1,
                    "subscription_name": "Starter Package",
                    "subscription_description": "Essential nutrition guidance",
                    "subscription_price": 89,
                    "currency_code": "$",
                    "subscription_discount": 50,
                    "subscription_duration": 1,
                    "subscription_image_url": "/static/images/basic-plan.jpg",
                    "is_popular": False,
                    "features": [
                        {
                            "feature_id": 1,
                            "feature_name": "Basic meal guidelines",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 2,
                            "feature_name": "Monthly consultation",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 3,
                            "feature_name": "Email support",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 4,
                            "feature_name": "Nutrition tips",
                            "feature_description": "...",
                        },
                    ],
                },
                {
                    "subscription_type_id": 2,
                    "subscription_name": "Transformation Package",
                    "subscription_description": "Comprehensive nutrition program",
                    "subscription_price": 199,
                    "currency_code": "$",
                    "subscription_discount": 15,
                    "subscription_duration": 3,
                    "subscription_image_url": "/static/images/transformation-plan.jpg",
                    "is_popular": True,
                    "features": [
                        {
                            "feature_id": 5,
                            "feature_name": "Custom meal plans",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 6,
                            "feature_name": "Weekly consultations",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 7,
                            "feature_name": "Progress tracking",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 8,
                            "feature_name": "Recipe database access",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 9,
                            "feature_name": "Support community",
                            "feature_description": "...",
                        },
                    ],
                },
                {
                    "subscription_type_id": 3,
                    "subscription_name": "Elite Package",
                    "subscription_description": "Premium personalized nutrition",
                    "subscription_price": 349,
                    "currency_code": "$",
                    "subscription_discount": 0,
                    "subscription_duration": 6,
                    "subscription_image_url": "/static/images/elite-plan.jpg",
                    "is_popular": False,
                    "features": [
                        {
                            "feature_id": 10,
                            "feature_name": "Complete lifestyle plan",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 11,
                            "feature_name": "Bi-weekly consultations",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 12,
                            "feature_name": "24/7 WhatsApp support",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 13,
                            "feature_name": "Fitness program integration",
                            "feature_description": "...",
                        },
                        {
                            "feature_id": 14,
                            "feature_name": "Family nutrition advice",
                            "feature_description": "...",
                        },
                    ],
                },
            ]
        ),
        200,
    )


# Add other API routes similarly
@api.route("/api/topics", methods=["GET"])
def get_topics():
    # Your topics data
    return jsonify([
        {
            "topic_id": 1,
            "topic_name": "Healthy Diets",
        },
        {
            "topic_id": 2,
            "topic_name": "Healthy Eating Habits",
        },
        {
            "topic_id": 3,
            "topic_name": "Healthy Lifestyle",
        },
    ]), 200


@api.route("/api/articles", methods=["GET"])
def get_articles():
    # Your articles data
    return (
        jsonify(
            [
                {
                    "article_id": 1,
                    "article_title": "The Benefits of Mediterranean Diet",
                    "slug": "benefits-mediterranean-diet",
                    "article_text": "The Mediterranean diet is rich in...",
                    "article_image_url": "/static/images/basic-plan.jpg",
                    "published_at": "2025-03-15T14:30:00Z",
                    "view_count": 245,
                    "topic_id": 3,
                    "topic_name": "Healthy Diets",
                    "author_name": "Dr. Sarah Johnson",
                },
                {
                    "article_id": 2,
                    "article_title": "The Benefits of Mediterranean Diet",
                    "slug": "benefits-mediterranean-diet",
                    "article_text": "The Mediterranean diet is rich in...",
                    "article_image_url": "/static/images/basic-plan.jpg",
                    "published_at": "2025-03-15T14:30:00Z",
                    "view_count": 245,
                    "topic_id": 3,
                    "topic_name": "Suger Control",
                    "author_name": "Dr. Sarah Johnson",
                },
                {
                    "article_id": 3,
                    "article_title": "The Benefits of Mediterranean Diet",
                    "slug": "benefits-mediterranean-diet",
                    "article_text": "The Mediterranean diet is rich in...",
                    "article_image_url": "/static/images/basic-plan.jpg",
                    "published_at": "2025-03-15T14:30:00Z",
                    "view_count": 245,
                    "topic_id": 3,
                    "topic_name": "Nutrition Tips",
                    "author_name": "Dr. Sarah Johnson",
                },
            ]
        ),
        200,
    )


@api.route("/api/testimonials", methods=["GET"])
def get_testimonials():
    # Your testimonials data
    return (
        jsonify(
            [
                {
                    "feedback_id": 1,
                    "full_name": "Jane Smith",
                    "rating": 5,
                    "comment": "Lost 15kg in just 3 months following the custom diet plan!",
                    "image_url": "/static/images/basic-plan.jpg",
                    "subscription_name": "Premium",
                    "stats": [
                        {"value": "15kg", "label": "Weight Loss"},
                        {"value": "3.2", "label": "BMI Reduction"},
                    ],
                },
                {
                    "feedback_id": 1,
                    "full_name": "Jane Smith",
                    "rating": 5,
                    "comment": "Lost 15kg in just 3 months following the custom diet plan!",
                    "image_url": "/static/images/basic-plan.jpg",
                    "subscription_name": "Premium",
                    "stats": [
                        {"value": "15kg", "label": "Weight Loss"},
                        {"value": "3.2", "label": "BMI Reduction"},
                    ],
                },
                {
                    "feedback_id": 1,
                    "full_name": "Jane Smith",
                    "rating": 5,
                    "comment": "Lost 15kg in just 3 months following the custom diet plan!",
                    "image_url": "/static/images/basic-plan.jpg",
                    "subscription_name": "Premium",
                    "stats": [
                        {"value": "15kg", "label": "Weight Loss"},
                        {"value": "3.2", "label": "BMI Reduction"},
                    ],
                },
            ]
        ),
        200,
    )

@api.route("/api/contact-requests", methods=["POST"])
def contact_request():
    data = request.json  # For application/json content type
    print(data)
    # Access fields like: data['name'], data['email'], etc.
    return jsonify({"message": "Contact request submitted successfully"}), 200