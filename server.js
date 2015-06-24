var express     = require('express'),
    server      = express(),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId    = require('mongodb').ObjectId,
    port        = 3000,
    methodOverride = require('method-override'),
    mongoose    = require('mongoose');
    mongoose.set('debug', true);
var Schema      = mongoose.Schema;

// View folder and engine
server.set('views', "./views");
server.set('view_engine', 'ejs');

// Static files
server.use(express.static("./public"));
server.use(methodOverride("_method"));
server.use(bodyParser.urlencoded({
  extended: true
}));

// Menu item schema
var menuItemSchema = new Schema ({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  allergens: [ { type: String, required: true } ],
  price: { type: Number, required: true }
});

// Order item schema
var orderSchema = new Schema ({
  table: { type: String, required: true, unique: true },
  items: [menuItemSchema]
});

// Create models and collections
var order = mongoose.model('orders', orderSchema);
var menu = mongoose.model('menu', menuItemSchema);

// Connect to database
mongoose.connect('mongodb://localhost:27017/restaurant-db/');

/// Index page
server.get('/home.html', function(req, res) {
  res.render('home.html', {});
});


/*****************MENU***********************/
// Show Menu List
server.get('/menu', function(req, res) {
  menu.find({}, function(err, menuArray) {
    res.render("boh/boh_index.ejs", {
      menuItem: menuArray
    });
  });
});

// Show Menu item
server.get("/menu/:id", function(req, res) {
  var mongoId = new ObjectId(req.params.id);

  menu.findOne({ _id: mongoId }, function(err, foundItem) {
    res.render("boh/boh_show.ejs", {
      menuItem: foundItem
    });
  });
});

// Create Menu item
server.post("/create_menu", function(req, res) {
  var data = req.body.menuItem;
  var newItem = new menu(data);
  newItem.hidden = false;
  console.log(newItem);
  newItem.save(function(err, result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    };
  });
  res.redirect(301, "/menu");
});

// Edit Menu item
server.get("/menu/:id/edit_item", function(req, res) {
  var mongoId = new ObjectId(req.params.id);

  menu.findOne({ _id: mongoId }, function(err, foundItem) {
    res.render("boh/boh_edit.ejs", {
      menuItem: foundItem
    });
  });
});

// Update Menu item
server.patch("/menu/:id", function(req, res) {
  var mongoId = new ObjectId(req.params.id);
  var updatedItem = req.body.menuItem;

  menu.update({ _id: mongoId }, updatedItem, function(err, result) {
    res.redirect(301, '/menu/' + req.params.id);
  });
});

server.delete("/menu/:id", function(req, res) {
  var mongoId = new ObjectId(req.params.id);

  menu.remove(
    { _id: mongoId }, function(err, result) {
      res.redirect(301, "/menu");
  });
});
/*****************ORDERS***********************/

// Gets and shows current order list
server.get("/orders", function(req, res) {
  orders.find({}, function(err, ordersArray) {
    res.render("foh/foh_index.ejs", {
      orderItem: ordersArray
    });
  });
});

// Create order page
server.post("/create_order", function(req, res) {
<<<<<<< HEAD
  var data = req.body.menuItem;
  var newItem = new menuItem(data);
=======
  var data = req.body.orderItem;
  var newItem = new order(data);
>>>>>>> 951d37f3233498e59c22b0477d0291aef117abbe
  newItem.hidden = false;

  newItem.save(function(err, result) {
    if(err) {
      console.log(err);
    }
  });
  res.redirect(301, "/orders");
});

// Edit Orders of table
server.get("/orders/:id/edit_order", function(req, res) {
  var mongoId = new ObjectId(req.params.id);

  order.findOne({ _id: mongoId }, function(err, foundItem) {
    res.render("boh/boh_edit.ejs", {
      orderItem: foundItem
    });
  });
});

// Update orders & returns to current orders
server.patch("/orders/:id", function(req, res) {
  var mongoId = new ObjectId(req.params.id);
  var updatedItem = req.body.orderItem;

  order.update({ _id: mongoId }, updatedItem, function(err, result) {
    res.redirect(301, '/orders/' + req.params.id);
  });
});

// Connect server...
server.listen(port, function () {
  console.log("Server is listening..");
});
