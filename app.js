const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const Blog = require('./models/blog');
const blogRoutes=require('./routes/blogRoutes');

// express app
const app = express();
// connect mongodb
const dburl='mongodb+srv://raja:abc@123@cluster0.4qfd9.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose.connect(dburl,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));

// listen for requests
// app.listen(3000);
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});