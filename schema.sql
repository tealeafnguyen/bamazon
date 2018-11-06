DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE IF NOT EXISTS items (
  item_id INT NOT NULL AUTO_INCREMENT, 
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(13, 2) NOT NULL,
  stock_quantity SMALLINT NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO items(product_name, department_name, price, stock_quantity) VALUE
('PS4', 'Electronics', 299.99, 90), 
('Xbox One', 'Electronics', 299.99, 7), 
('Nintendo Switch', 'Electronics', 299.99, 1),
('Samsung Galaxy S8 Refurbished', 'Electronics', 349.99, 21),
('Chromebook', 'Electronics', 149.99, 278),
('Digital Fortress by Dan Brown', 'Books', 2.99, 5405),
('Snobs by Julian Fellowes', 'Books', 2.99, 2455),
('Snap by Belinda Bauer', 'Books', 2.99, 2145),
('Mudclipknot Multiclip Shears', 'Kitchen', 6.99, 525),
('Crockpot Double Handle Soup Bowls', 'Kitchen', 19.99, 215);

SELECT * FROM items;
