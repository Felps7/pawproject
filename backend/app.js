const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const sessionMiddleware = require('./middlewares/session');

var apiEmentaRouter = require('./routes/apiEmenta');
var apiReservaRouter = require('./routes/apiReserva');
var apiUserRouter = require('./routes/apiUser');
var sessionRouter = require('./routes/session');
var adminRouter = require('./routes/apiAdmin');

//init app
const app = express();


mongoose.Promise = global.Promise;

const adminInfos = {
  nome:'default',
  username: "admin",
  password: "admin",
}
const bcrypt = require('bcryptjs');

const Admin = require("./models/admin");
const Utilizador = require("./models/users");
mongoose.connect('mongodb://localhost:27017/restaurante', { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => {
    console.log('connection succesful')
    Admin.find(function (err, admins) {
      if (err) {
        console.log(err);
      } else {
        if (admins.length < 1) {
          const newUtilizador = new Utilizador(adminInfos);
          newUtilizador.save(function (err, utilizador) {
            if (err) {
              console.log(err);
            } else {
              const admin = new Admin({utilizadorId : utilizador._id});
              admin.save(function (err)  {
                  if(err) {
                      next(err);
                  } else {
                      console.log("Default Admin created!")
                  }
              });

            }
          });
        }
      }
    })
  })
  .catch((err) => console.error(err));




//Body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'frontend')));


app.use('/api/utilizador', apiUserRouter);
app.use('/api/reserva', apiReservaRouter);
app.use('/api/admin', adminRouter);
app.use('/api', sessionRouter);
app.use('/api/ementas', apiEmentaRouter)


app.use('/*',function(req,res){
    try{
      res.sendFile(path.join(__dirname,'frontend','dist','frontend','index.html'));
    } catch(err){
      console.log(err)
    }
  })

  // catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send(err.message || 'error');
  });


//Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});

module.exports = app;