const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.get('/', (req, res) => res.render('beranda'));
app.get('/layanan', (req, res) => res.redirect('/#layanan'));
app.get('/portofolio', (req, res) => res.redirect('/#portofolio'));
app.get('/tentang', (req, res) => res.redirect('/#tentang'));

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;