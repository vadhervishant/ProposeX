const app = require('./src/index');

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is up and running at ' + (process.env.PORT || 5000));
});
