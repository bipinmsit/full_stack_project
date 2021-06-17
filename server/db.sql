-- list database \l

-- Create database CREATE DATABASE practice

-- connect to the database \c

-- list all the tables \d

-- list all the column of the table \d table_name

-- List all enteries of table SELECT * FROM table_name

CREATE TABLE products(
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);

ALTER TABLE products COLUMN featured boolean;
ALTER TABLE products COLUMN featured;

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range>=1 and price_range<=5)
);

INSERT INTO restaurants(id, name, location, price_range) 
VALUES(123, 'mcdonalds', 'new yorks', 3);

UPDATE restaurants SET name="bipin", location="jamui", price_range=5

DELETE FROM restaurants WHERE id=123;


CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating>=1 and rating<=5)
);
