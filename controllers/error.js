exports.get404 = (req, res, next) => {
  res.status(404).render('err', { pageTitle: 'Page Not Found', path:'/err' });
};
