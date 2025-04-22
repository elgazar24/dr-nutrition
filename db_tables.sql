-- 1. Countries Table
CREATE TABLE IF NOT EXISTS countries (
    country_code SERIAL PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Currencies Table
CREATE TABLE IF NOT EXISTS currencies (
    currency_code CHAR(3) PRIMARY KEY,
    currency_name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) CHECK (phone ~ '^\+?[0-9]{8,15}$'),
    country_code INT NOT NULL,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_country 
        FOREIGN KEY (country_code) 
        REFERENCES countries(country_code) 
        ON DELETE RESTRICT
);

-- 4. Body Data Table
CREATE TABLE IF NOT EXISTS body_data (
    body_data_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    weight NUMERIC(5, 2) NOT NULL,
    height NUMERIC(4, 2) NOT NULL,
    age INT NOT NULL CHECK (
        age BETWEEN 10
        AND 120
    ),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    activity_level VARCHAR(20) NOT NULL CHECK (
        activity_level IN (
            'sedentary',
            'light',
            'moderate',
            'active',
            'very_active'
        )
    ),
    bmi NUMERIC(5, 2),
    bmr NUMERIC(7, 2),
    image_url VARCHAR(255),
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_body_data_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE
);

-- 5. Subscription Types Table
CREATE TABLE IF NOT EXISTS subscription_types (
    subscription_type_id SERIAL PRIMARY KEY,
    subscription_name VARCHAR(100) NOT NULL UNIQUE,
    subscription_description TEXT NOT NULL,
    subscription_price NUMERIC(10, 2) NOT NULL CHECK (subscription_price >= 0),
    currency_code CHAR(3) NOT NULL,
    subscription_discount NUMERIC(5, 2) CHECK (
        subscription_discount BETWEEN 0
        AND 100
    ),
    subscription_discount_duration INT CHECK (subscription_discount_duration > 0),
    subscription_duration INT NOT NULL CHECK (subscription_duration > 0),
    subscription_image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_subscription_currency 
        FOREIGN KEY (currency_code) 
        REFERENCES currencies(currency_code) 
        ON DELETE RESTRICT
);

-- 6. Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    subscription_type_id INT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_subscription_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_subscription_type 
        FOREIGN KEY (subscription_type_id) 
        REFERENCES subscription_types(subscription_type_id) 
        ON DELETE RESTRICT
);

-- 7. Articles Table 
CREATE TABLE IF NOT EXISTS articles (
    article_id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL,
    article_title VARCHAR(100) NOT NULL,
    article_text TEXT NOT NULL,
    article_image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_article_topic 
        FOREIGN KEY (topic_id) 
        REFERENCES topics(topic_id) 
        ON DELETE RESTRICT
);
-- 8. Features Table
CREATE TABLE IF NOT EXISTS features (
    feature_id SERIAL PRIMARY KEY,
    feature_name VARCHAR(100) NOT NULL UNIQUE,  
    feature_description TEXT NOT NULL,  
    feature_image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Subscription Features (Junction Table)
CREATE TABLE IF NOT EXISTS subscription_features (
    subscription_feature_id SERIAL PRIMARY KEY,
    subscription_type_id INT NOT NULL,
    feature_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_subscription_feature 
        PRIMARY KEY (subscription_type_id, feature_id),  -- Composite PK
    CONSTRAINT fk_subscription_feature_type
        FOREIGN KEY (subscription_type_id)
        REFERENCES subscription_types(subscription_type_id)
        ON DELETE CASCADE,  -- Remove features when subscription type is deleted
    CONSTRAINT fk_subscription_feature
        FOREIGN KEY (feature_id)
        REFERENCES features(feature_id)
        ON DELETE CASCADE
);

-- 10. Topics Table
CREATE TABLE IF NOT EXISTS topics (
    topic_id SERIAL PRIMARY KEY,
    topic_name VARCHAR(100) NOT NULL UNIQUE,  -- Added UNIQUE
    topic_description TEXT NOT NULL,  -- Changed to TEXT
    topic_image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 11. Messages Table
CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- Changed from nullable to NOT NULL
    topic_id INT NOT NULL,
    message_title VARCHAR(100) NOT NULL,
    message_text TEXT NOT NULL,  -- Changed to TEXT
    attachment_url VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_message_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_message_topic
        FOREIGN KEY (topic_id)
        REFERENCES topics(topic_id)
        ON DELETE RESTRICT
);

-- 12. Contact Requests Table
CREATE TABLE IF NOT EXISTS contact_requests (
    contact_request_id SERIAL PRIMARY KEY,
    user_id INT,  
    email VARCHAR(100) NOT NULL CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$'), 
    topic VARCHAR(100) NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+?[0-9]{8,15}$'),
    message TEXT NOT NULL, 
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'resolved')), 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contact_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL  
);

-- 13. Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id SERIAL PRIMARY KEY,
    user_id INT,  
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),  
    comment TEXT NOT NULL, 
    response TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- 14. Articles Table (Enhanced)
CREATE TABLE IF NOT EXISTS articles (
    article_id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL,
    author_id INT NOT NULL,  
    article_title VARCHAR(100) NOT NULL,
    slug VARCHAR(110) NOT NULL UNIQUE, 
    article_text TEXT NOT NULL,
    article_image_url VARCHAR(255),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_article_topic
        FOREIGN KEY (topic_id)
        REFERENCES topics(topic_id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_article_author
        FOREIGN KEY (author_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
);

-- 15. Comments Table
CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT , 
    article_id INT NOT NULL,
    parent_comment_id INT, 
    comment_text TEXT NOT NULL,  
    is_approved BOOLEAN DEFAULT FALSE,  
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_article
        FOREIGN KEY (article_id)
        REFERENCES articles(article_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_parent
        FOREIGN KEY (parent_comment_id)
        REFERENCES comments(comment_id)
        ON DELETE SET NULL
);

-- 16. Admins Table (Security Enhanced)
CREATE TABLE IF NOT EXISTS admins (
    admin_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,  -- 1:1 relationship
    admin_email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'editor', 'nutritionist')),
    last_login TIMESTAMPTZ,
    login_attempts INT DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 17. Diets Table (Enhanced)
CREATE TABLE IF NOT EXISTS diets (
    diet_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    nutritionist_id INT NOT NULL, 
    diet_name VARCHAR(100) NOT NULL,
    diet_description TEXT NOT NULL,  
    diet_notes TEXT, 
    diet_file_url VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_diet_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_diet_nutritionist
        FOREIGN KEY (nutritionist_id)
        REFERENCES admins(admin_id)
        ON DELETE RESTRICT,
    CONSTRAINT chk_diet_dates CHECK (end_date >= start_date)
);

-- 18. Meals Table
CREATE TABLE IF NOT EXISTS meals (
    meal_id SERIAL PRIMARY KEY,
    diet_id INT NOT NULL,
    meal_name VARCHAR(100) NOT NULL,
    meal_description TEXT NOT NULL, 
    meal_image_url VARCHAR(255),
    eating_time_id INT NOT NULL,
    day_of_week INT CHECK (day_of_week BETWEEN 1 AND 7), 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_meal_diet
        FOREIGN KEY (diet_id)
        REFERENCES diets(diet_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_meal_eating_time
        FOREIGN KEY (eating_time_id)
        REFERENCES eating_times(eating_time_id)
        ON DELETE RESTRICT
);

-- 19. Foods Table (Enhanced Nutrition Tracking)
CREATE TABLE IF NOT EXISTS foods (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL UNIQUE,
    food_calories_per_100g NUMERIC(6,2) NOT NULL,
    food_protein_per_100g NUMERIC(5,2) NOT NULL,
    food_carbs_per_100g NUMERIC(5,2) NOT NULL,
    food_fat_per_100g NUMERIC(5,2) NOT NULL,
    food_fiber_per_100g NUMERIC(5,2),  
    food_sugar_per_100g NUMERIC(5,2),  
    food_description TEXT,  
    food_image_url VARCHAR(255),
    food_category VARCHAR(50), 
    is_verified BOOLEAN DEFAULT FALSE,  
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 20. Meal Foods Table (Junction Table)
CREATE TABLE IF NOT EXISTS meal_foods (
    meal_food_id SERIAL PRIMARY KEY,
    meal_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity_g NUMERIC(6,2) NOT NULL CHECK (quantity_g > 0),
    notes TEXT,
    CONSTRAINT pk_meal_food 
        PRIMARY KEY (meal_id, food_id),  -- Composite PK
    CONSTRAINT fk_meal_food_meal
        FOREIGN KEY (meal_id)
        REFERENCES meals(meal_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_meal_food_food
        FOREIGN KEY (food_id)
        REFERENCES foods(food_id)
        ON DELETE RESTRICT
);

-- 21. Eating Times Table
CREATE TABLE IF NOT EXISTS eating_times (
    eating_time_id SERIAL PRIMARY KEY,
    eating_time_name VARCHAR(100) NOT NULL UNIQUE,
    from_hour TIME NOT NULL,  
    to_hour TIME NOT NULL,
    eating_time_description TEXT, 
    CONSTRAINT chk_eating_time CHECK (to_hour > from_hour)
);