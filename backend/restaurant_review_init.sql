CREATE DATABASE restaurant_review;
USE restaurant_review;

-- =========================
-- 1. users
-- =========================

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    profile_image_url VARCHAR(255),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- 2. categories
-- =========================

CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categories (name) VALUES
('한식'),
('중식'),
('일식'),
('양식'),
('분식'),
('카페'),
('패스트푸드');

-- =========================
-- 3. restaurants
-- =========================

CREATE TABLE restaurants (
    restaurant_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    category_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(30),

    description TEXT,

    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,

    opening_hours VARCHAR(255),
    image_url VARCHAR(255),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);

-- =========================
-- 4. menus
-- =========================

CREATE TABLE menus (
    menu_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    restaurant_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,

    description TEXT,

    image_url VARCHAR(255),

    is_representative BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
        ON DELETE CASCADE
);

-- =========================
-- 5. reviews
-- =========================

CREATE TABLE reviews (
    review_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,

    taste_score TINYINT NOT NULL,
    price_score TINYINT NOT NULL,
    service_score TINYINT NOT NULL,

    content TEXT,

    image_url VARCHAR(255),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
        ON DELETE CASCADE,

    CHECK (taste_score BETWEEN 1 AND 5),
    CHECK (price_score BETWEEN 1 AND 5),
    CHECK (service_score BETWEEN 1 AND 5)
);

-- =========================
-- 6. favorites
-- =========================

CREATE TABLE favorites (
    favorite_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
        ON DELETE CASCADE,

    UNIQUE (user_id, restaurant_id)
);

-- =========================
-- INDEX
-- =========================

CREATE INDEX idx_restaurant_name
ON restaurants(name);

CREATE INDEX idx_restaurant_category
ON restaurants(category_id);

CREATE INDEX idx_restaurant_location
ON restaurants(latitude, longitude);

CREATE INDEX idx_review_restaurant
ON reviews(restaurant_id);

CREATE INDEX idx_favorite_user
ON favorites(user_id);

