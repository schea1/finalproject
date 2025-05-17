
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("css"));


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));

// Route to the welcome page
app.get('/', (request, response) => {
    response.render("index");
});

// Route to the create customer page
app.get('/create', (request, response) => {
  
    const name = "Amy";
    response.render("create", {name: name});
});

// GET Route to import page
app.get('/import', (request, response) => {
    response.render("import");
});

// POST Route to import page
app.post('/import', (request, response) => {
    const message = "success";
    
    const name = request.body.name;
    
    response.render("import", 
        {
            message: message,
            name: name
        });
});

// GET Route to export page
app.get('/export', (request, response) => {
    response.render("export");
});

// POST Route to export page
app.post('/export', (request, response) => {
    const message = "success";

// Get name passed from the form
    const name = request.body.name;

//Call formPost passing message and name
    response.render("export", 
        {
            message: message,
            name: name
        });
});

// Route to download customers as CSV

app.get('/download-customers', (req, res) => {
    const customers = [
        { id: 101, first_name: "Alfred",   last_name: "Alexander", state: "NV", sales_ytd: 1500, sales_prev: 900 },
        { id: 102, first_name: "Cynthia",  last_name: "Chase",     state: "CA", sales_ytd: 900,  sales_prev: 1200 },
        { id: 103, first_name: "Ernie",    last_name: "Ellis",     state: "CA", sales_ytd: 3500, sales_prev: 4000 },
        { id: 104, first_name: "Hubert",   last_name: "Hughes",    state: "CA", sales_ytd: 4500, sales_prev: 2000 },
        { id: 105, first_name: "Kathryn",  last_name: "King",      state: "NV", sales_ytd: 850,  sales_prev: 500 },
        { id: 106, first_name: "Nicholas", last_name: "Niles",     state: "NV", sales_ytd: 500,  sales_prev: 400 },
        { id: 107, first_name: "Patricia", last_name: "Pullman",   state: "AZ", sales_ytd: 1000, sales_prev: 1100 },
        { id: 108, first_name: "Sally",    last_name: "Smith",     state: "NV", sales_ytd: 1000, sales_prev: 1100 },
        { id: 109, first_name: "Shelly",   last_name: "Smith",     state: "NV", sales_ytd: 2500, sales_prev: 0 },
        { id: 110, first_name: "Terrance", last_name: "Thomson",   state: "CA", sales_ytd: 5000, sales_prev: 6000 },
        { id: 111, first_name: "Valarie",  last_name: "Vega",      state: "AZ", sales_ytd: 0,    sales_prev: 3000 },
        { id: 112, first_name: "Xavier",   last_name: "Xerox",     state: "AZ", sales_ytd: 600,  sales_prev: 250 }
    ];
    let csv = "id,first_name,last_name,state,sales_ytd,previous_years_sales\n";
    customers.forEach(c => {
        csv += `${c.id},${c.first_name},${c.last_name},${c.state},${c.sales_ytd},${c.sales_prev}\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('customers.csv');
    res.send(csv); 
});