const request = require('supertest');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')


var app = express();
var microservice1 = express();
var microservice2 = express();
var microservice3 = express();
var microservice4 = express();
var microservice5 = express();
var microservice6 = express();

microservice1.set('port', 3001);
microservice2.set('port', 3002);
microservice3.set('port', 3003);
microservice4.set('port', 3004);
microservice5.set('port', 3005);
microservice6.set('port', 3006);


app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'pug');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

app.get('*', function(req, res) { res.render('home'); });


microservice1.use(cors())
microservice2.use(cors())
microservice3.use(cors())
microservice4.use(cors())
microservice5.use(cors())
microservice6.use(cors())
microservice1.use(bodyParser.json());
microservice2.use(bodyParser.json());
microservice3.use(bodyParser.json());
microservice4.use(bodyParser.json());
microservice5.use(bodyParser.json());
microservice6.use(bodyParser.json());


// microservice for add element
microservice1.post('/token', function(req, res) {
    if(req.body.body[1] != '')
    {
        var array = req.body.body[0];
        array.push(req.body.body[1]);
        res.status(200).send(array);
    }
    else
    {
        res.status(400).send('This is an error!');
    }
});

microservice2.post('/token', function(req, res) {
    if(req.body.body[1] != '')
    {
        var array = req.body.body[0];
        var index = array.indexOf(req.body.body[1]);
        if (index !== -1) {
            array.splice(index, 1);
        }
        res.status(200).send(array);
    }
    else
    {
        res.status(400).send('This is an error!');
    }
});

microservice3.post('/token', function(req, res) {
    if(req.body.body[1] != '')
    {
        var array = req.body.body[0];
        if (req.body.body[1] < array.length) {
            array.splice(req.body.body[1], 1);
        }
        res.status(200).send(array);
    }
    else
    {
        res.status(400).send('This is an error!');
    }
});

microservice4.post('/token', function(req, res) {
    if(req.body.body[1] != '')
    {
        var array = req.body.body[0];
        var swap = req.body.body[1].split(",");
        if(swap.length != 2)
        {
            res.status(400).send('Syntax Error: index , index !');
        }
        else
        {
            if(swap[0] < array.length && swap[1] < array.length)
            {
                var temp = array[parseInt(swap[0])]
                array[parseInt(swap[0])] = array[parseInt(swap[1])]
                array[parseInt(swap[1])] = temp;
                res.status(200).send(array);
            }
        }
    }
    else
    {
        res.status(400).send('This is an error!');
    }
});

microservice5.post('/token', function(req, res) {
    res.status(200).send([]);
});

microservice6.post('/token', function(req, res) {
    var array = req.body.body[0];
    res.status(200).send(array.length.toString());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

http.createServer(microservice1).listen(microservice1.get('port'), function(){
    console.log('MicroService1 listening on port ' + microservice1.get('port'));
});
http.createServer(microservice2).listen(microservice2.get('port'), function(){
    console.log('MicroService2 listening on port ' + microservice2.get('port'));
});
http.createServer(microservice3).listen(microservice3.get('port'), function(){
    console.log('MicroService3 listening on port ' + microservice3.get('port'));
});
http.createServer(microservice4).listen(microservice4.get('port'), function(){
    console.log('MicroService4 listening on port ' + microservice4.get('port'));
});
http.createServer(microservice5).listen(microservice5.get('port'), function(){
    console.log('MicroService5 listening on port ' + microservice5.get('port'));
});
http.createServer(microservice6).listen(microservice6.get('port'), function(){
    console.log('MicroService6 listening on port ' + microservice6.get('port'));
});


describe('Try to send post method to first microservice "/token" (microservice1 = port 3001)', function() {
    it('Should response code 200 (Send array [1,1], and item 3 - Should return [1,1,3])', function(done) {
        request(microservice1)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1'], '3']})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                else
                {
                    done();
                    console.log(res.body);
                }
            });
    });
    it('Should response code 400 (Send array [1,1], but item is blank - Should return code 400)', function(done) {
        request(microservice1)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1'], '']})
            .expect(400)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });
});

describe('Try to send post method to second microservice "/token" (microservice2 = port 3002)', function() {
    it('Should response code 200 (Send array [1,1], and item 1 - Should return [1])', function(done) {
        request(microservice2)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1'], '1']})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                else
                {
                    done();
                    console.log(res.body);
                }
            });
    });
    it('Should response code 400 (Send array [1,1], but item is blank - Should return code 400)', function(done) {
        request(microservice2)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1'], '']})
            .expect(400)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });
});

describe('Try to send post method to third microservice "/token" (microservice3 = port 3003)', function() {
    it('Should response code 200 (Send array [1,1,3], and item 2 - Should return [1,1])', function(done) {
        request(microservice3)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1','3'], '2']})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                else
                {
                    done();
                    console.log(res.body);
                }
            });
    });
    it('Should response code 400 (Send array [1,1], but item is blank - Should return code 400)', function(done) {
        request(microservice3)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1'], '']})
            .expect(400)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });
});

describe('Try to send post method to fourth microservice "/token" (microservice4 = port 3004)', function() {
    it('Should response code 200 (Send array [1,2,3], and item 0,2 - Should return [3,2,1])', function(done) {
        request(microservice4)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','2','3'], '0,2']})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                else
                {
                    done();
                    console.log(res.body);
                }
            });
    });
    it('Should response code 400 (Send array [1,1], but item is blank - Should return code 400)', function(done) {
        request(microservice4)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1'], '']})
            .expect(400)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });
    it('Should response code 400 (Send array [1,2,3], but item is 1 - Should return code 400)', function(done) {
        request(microservice4)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','2','3'], '1']})
            .expect(400)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
    });
});

describe('Try to send post method to fifth microservice "/token" (microservice5 = port 3005)', function() {
    it('Should response code 200 (Send array [1,1,3] - Should return [])', function(done) {
        request(microservice5)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1','3']]})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                else
                {
                    done();
                    console.log(res.body);
                }
            });
    });
});

describe('Try to send post method to sixth microservice "/token" (microservice6 = port 3006)', function() {
    it('Should response code 200 (Send array [1,1,3] - Should return 3)', function(done) {
        request(microservice6)
            .post('/token')
            .set('Accept', 'application/json')
            .send({'body': [['1','1','3']]})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                else
                {
                    done();
                    console.log(res.text);
                }
            });
    });
});
