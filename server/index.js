const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors());

app.use('/questions', require('./routes/questionsRouter'));

app.listen(port, function () {
    console.log('Example app listening at localhost:%s', port);
});
