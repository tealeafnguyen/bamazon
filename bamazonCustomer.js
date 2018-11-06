var mysql = require("mysql");
var printf = require('printf');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "bamazon_db"
});

connection.connect();

connection.query('SELECT * FROM items', function (error, results, fields) {
    if (error) throw error;
    console.log(printf('%55s %15s %6s', 'Product Name', '| Product id |', 'Price($)'));
    for (var i = 0; i < results.length; i++) {
        console.log(printf('%50s %10i %16.2f', results[i].product_name, results[i].item_id, results[i].price))
    }
    prompt()
});


function prompt() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter product id of the item you want to buy ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter quantity to purchase ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM items WHERE ?", { item_id: answer.id }, function (err, res) {
             
                if (res[0] == null) {
                    console.log('Item not found');
                    process.exit();
                } else {
                    
                    if (res[0].stock_quantity < answer.quantity) {
                        console.log('Not enough items in stock');
                        process.exit();
                    } else {
                        purchase(res[0], answer.quantity, res[0].price * answer.quantity);
                    }
                }
            });
        });
}

function purchase(item, quantity, price) {

    connection.query(`UPDATE items SET stock_quantity = ${item.stock_quantity - quantity} WHERE ?`, { item_id: item.id }, function (err, res) {
        console.log(`Amount due: $${price}`)
        connection.end();
    })
}
