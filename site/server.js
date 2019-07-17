'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

const childProcess = require('child_process');
const githubUsername = [ 
      'ptsiampas',
      'jsmith-dev',
      'simonbeirouti'
];

app.use(express.json())

app.post("/webhooks/github", function(req, res) {

  var sender = req.body.sender;
  var branch = req.body.ref;

  console.log('-------------------')
  console.log(req.body.sender.login);
  console.log(req.body.ref);
  console.log('-------------------')
  //console.log(res);

  if (branch.indexOf('master') > -1 && githubUsername.includes(sender.login)) {
    deploy(res);
  }

})

function deploy(res){
  childProcess.exec('cd /usr/src/app && ./deploy.sh', function(err, stdout, stderr){
      if (err) {
       console.error(err);
       return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
