/*const express = require('express');
const app = express();
app.listen(3000, () => {console.log('server is listening on port 3000')});
*/
const express = require('express');
const fs = require('fs');
const { hostname } = require('os');
const path = require ('path');
const {NodeSSH} = require ('node-ssh');

const app = express();
const ssh = new NodeSSH();

app.listen(3001, () => {console.log('server is listening on port 3001')});

app.get ('/commande/VMBuild', (req,res) => {
    ssh.connect({
        host: '192.168.68.91',
        Username: 'User',
        privatekey: '/root/.ssh/id_rsa'
    })
    .then(function() {
        ssh.execCommand(ping).then(function(result) {
            res.send(result.stdout);
            console.log(result.stdout);
        })
    })
})
