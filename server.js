var express     = require('express'),
    server      = express(),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId    = require('mongodb').ObjectId,
    mongoose    = require('mongoose');
    mongoose.set('debug', true);
var Schema      = mongoose.Schema;

// View folder and engine
server.set('views', "./views");
server.set('view_engine', 'ejs');

// Static files
server.use(express.static("./public"));
server.use(bodyParser.urlencoded({
  extended: true
}));

var menuItemSchema = new Schema ({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  allergens: [{ type: String, required: true }],
  price: { type: String, required: true }
}, {collection: 'menu', strict: 'false', autoIndex: false });

var orderSchema = new Schema ({
  table: { type: String, required: true, unique },
  items: [menuItemSchema]
});

// Create blog
var orderItem = mongoose.model(null, orderSchema);
var menuItem = mongoose.model(null, menuItemSchema);

mongoose.connect('mongodb://localhost:27017/RESTaurant/');

/// Index page
server.get('/index', function(req, res) {
  res.render('index', {});
});


/*****************MENU***********************/
// Show Menu List
server.get('/menu', function(req, res) {
  menu.find({}, function(err, menuArray) {
    res.render("menu/menu_current.ejs", {
      menu: menuArray
    });
  });
});

// Show Menu item
server.get("/:id", function(req, res) {
  var mongoId = new ObjectId(req.params.id);

  menu.findOne({ _id: mongoId }, function(err, foundItem) {
    res.render("", {
      menuItem: foundItem
    });
  });
});

// Create Menu item
server.post("", function(req, res) {
  var data = req.body.menuItem;
  var newItem = new menuItem(data);
  newItem.hidden = false;

  newItem.save(function(err, result) {
    if(err) {
      console.log(err);
    }
  });
  res.redirect(301, "/menu");
});

// Edit Menu item
server.get("", function(req, res) {
  var mongoId = new ObjectId(req.params.id);

  menu.findOne({ _id: mongoId }, function(err, foundItem) {
    res.render("", {
      menuItem: foundItem
    });
  });
});

// Update Menu item
server.patch("/:id", function(req, res) {
  var mongoId = new ObjectId(req.params.id);
  var updatedItem = req.body.menuItem;
});
/*****************ORDERS***********************/

// server.get();
