const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
var cors = require('cors');

app.use(cors());

app.use('/questions', require('./routes/questionsRouter'));

app.listen(port, function () {
    console.log('Example app listening at localhost:%s', port);
});
