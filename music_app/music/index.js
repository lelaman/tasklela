const http = require('http');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require ('express-session');
 
  const app = express();
  app.use (express.json());
  app.use(express.urlencoded({extended:false}));


const dbConnection = require('./connection/db');
const uploadFile = require('./middlewares/uploadFile');
const { send } = require('process');

  app.set('view engine','hbs');
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use(session({
    cookie:{
      maxAge:1000 * 60 * 60 * 2,
    },
    store:new session.MemoryStore(),
    resave:false,
    secret:'secret',
    saveUninitialized:true,

  })
  );
  app.use(function(req,res,next){
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
  })


  hbs.registerPartials(__dirname +'/views/partials');

  const isLogin = false;
  const pathFile ='http://localhost:3000/uploads/';
  
  




  

  app.get('/',function(req,res) {
    const title ='Propinsi dan Kabupaten';

    const query = 'SELECT * FROM  provinsi  ORDER BY id DESC';
    dbConnection.getConnection(function(err,conn){
      if(err) throw err;
      conn.query (query,function(err,results) {
        if(err) throw err;

         const details = [];

         for(let result of results){
          details.push({
              id:result.id,
              nama:result.nama,
              diresmikan:result.diresmikan,
              photo:pathFile + result.photo,
              pulau:result.pulau,
              
           });
         } 
        console.log(results.length);

        res.render('index', {
          title,
          details,
      
      });
    });  
  })   
});

app.get('/Music/:id',function(req,res) {
  const id = req.params.id;
  const title = 'provinsi';
  const query =`SELECT * FROM provinsi WHERE id = ${id}`;
  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query (query,function(err,results) {
      if(err) throw err;

       const details = {
        id:results[0].id,
        nama:results[0].nama,
        diresmikan:results[0].diresmikan,
        photo:pathFile + results[0].photo,
        pulau:results[0].pulau,
       };
       
      res.render('provinsi', {
        title,
        details,
    
    });
  });  
});
});

app.get('/addprovinsi',function(req,res) {
  const title ='Add provinsi';
  res.render('addprovinsi', {
  title,

 });
 });

 app.post('/addprovinsi',uploadFile('photo'),function(req,res) {
   const {nama,diresmikan,pulau}= req.body;
   const photo = req.file.filename;
   

   
   if(nama == ''|| diresmikan == ''  ||pulau == ''){
     req.session.message = {
       type:'danger',
       message:'please insert all field'
     };
     return res.redirect('/addprovinsi')
   }

   const query =`INSERT INTO provinsi (nama,diresmikan,photo,pulau) VALUES ("${nama}","${diresmikan}",
      "${photo}","${pulau}") `

   dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query (query,function(err,results) {
      if(err) throw err;
      
      req.session.message= {
        type:'success',
        message:'add Provinsi succes',
      };
  
      res.redirect('/');
    });
    });
 });

 app.get('/editprovinsi/:id',function(req,res) {
  const title ='Edit provinsi';
  const {id} = req.params;
   
  const query = `SELECT * provinsi WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query (query,function(err,results) {
      if(err) throw err;

      const details = {
        ...results[0],
        photo:pathFile + results[0].photo
      };
    
        res.render('editprovinsi', {
        title,
        details,
      });
    });
  });
});

app.post('/editprovinsi',uploadFile('photo'), function (req,res) {
  
  const {id,nama,diresmikan,oldImage} = req.body;

  
   const photo = oldImage.replace(pathFile, '');
   
  if(req.file){
    const photo = req.file.filename;
  }
  const query = `UPDATE  provinsi SET nama = "${nama}",diresmikan= "${diresmikan}",photo = "${photo}", WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){

    if(err) throw err;
    conn.query (query,function (err, results) {
      if(err)throw err;
      

     res.redirect('/');
    });
  });
});

app.get('/Delete/:id',function(req,res) {
  const {id} = req.params;
  const query =  `DELETE FROM provinsi WHERE id = ${id}`;

 dbConnection.getConnection(function(err,conn){

  if(err) throw err;
  conn.query (query,function(err,results) {
    if(err) throw err;

    res.redirect('/');
    
    });
  });

 })







 app.get('/',function(req,res) {
  const title ='kabupaten';

  const query = 'SELECT * FROM  kabupaten ORDER BY id DESC';
  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query (query,function(err,results) {
      if(err) throw err;

       const details = [];

       for(let result of results){
        details.push({
            id:result.id,
            nama:result.nama,
            diresmikan:result.diresmikan,
            provinsi_id:result.provinsi_id,
            photo:pathFile + result.photo,
            
            
         });
       } 
      console.log(results.length);

      res.render('index', {
        title,
        details,
    
    });
  });  
})   
});

app.get('/Music/:id',function(req,res) {
const id = req.params.id;
const title = 'kabupaten';
const query =`SELECT * FROM kabupaten WHERE id = ${id}`;
dbConnection.getConnection(function(err,conn){
  if(err) throw err;
  conn.query (query,function(err,results) {
    if(err) throw err;

     const details = {
      id:results[0].id,
      nama:results[0].nama,
      diresmikan:results[0].diresmikan,
      provinsi_id:results[0].provinsi_id,
      photo:pathFile + results[0].photo,
     };
     
    res.render('provinsi', {
      title,
      details,
  
  });
});  
});
});

app.get('/addkabupaten',function(req,res) {
const title ='kabupaten';
res.render('addkabupaten', {
title,

});
});

app.post('/addkabupaten',uploadFile('photo'),function(req,res) {
 const {nama,diresmikan,provinsi_id}= req.body;
 const photo = req.file.filename;
 
 

 
 if(nama == ''|| diresmikan == ''  ||provinsi_id == ''){
   req.session.message = {
     type:'danger',
     message:'please insert all field'
   };
   return res.redirect('/addkabupaten')
 }

 const query =`INSERT INTO kabupaten (nama,diresmikan,provinsi_id,photo) VALUES ("${nama}","${diresmikan}",
 "${provinsi_id}","${photo}") `

 dbConnection.getConnection(function(err,conn){
  if(err) throw err;
  conn.query (query,function(err,results) {
    if(err) throw err;
    
    req.session.message= {
      type:'success',
      message:'kabupaten  succes',
    };

    res.redirect('/');
  });
  });
});





  const port = 3000;
  const server = http.createServer(app);
  server.listen(port);
  console.debug(`Tersambung.... ${port}`);
  