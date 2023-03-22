var express =   require("express");  
var multer  =   require('multer');  
var cors = require('cors');
var app =   express();  
const fs = require('fs');
const path = require('path');

app.use(cors());
// allow * for all origins
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './pages');  
  },  
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('myfile');  
  
app.get('/',function(req,res){  
      res.sendFile(__dirname + "/index.html");  
});  

app.get('/test',function(req,res){
    res.send("Hello World");
    console.log("Hello World");
});
  
app.post('/upload',function(req,res){  
    upload(req,res,function(err) {  
        if(err) {  
            console.log(err)
            return res.end("Error uploading file.");  
        }  
        res.end("File is uploaded successfully!");  
    });  
});  

app.get('/api/page/:page', function(req, res) {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'uploads', `${page}.js`);
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
        res.status(404).send(`File ${page}.js not found`);
        return;
    }

    const pageModule = require(filePath);

    // Check if the file module exports a function called "executePage"
    if (typeof pageModule.executePage !== 'function') {
        res.status(500).send(`File ${page}.js does not export an executePage function`);
        return;
    }

    // Execute the file and get the output
    const output = pageModule.executePage();

    // Send the output back to the client
    res.send(`${page}.js was successfully executed. Output: ${output}`);
});
  
app.listen(2000,function(){  
    console.log("Server is running on port 2000");  
});  