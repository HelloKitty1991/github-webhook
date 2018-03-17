const http = require('http')
const createHandler = require('github-webhook-handler')
const queryHouseInfo = require('./queryHouseInfo');
const handlerOptions = [{
    path: '/apollo-webhook', secret: 'IAv38Q9uPyZTM2Pr'
}, {
    path: '/personal-static-webhook', secret: 'Fg3ITv6aUxCYMGsM'
},{
    path: '/personal-h5-webhook', secret: 'bEdhVJnBS0tpIHGA'
}]
const handlerMap = {};
handlerOptions.forEach(option =>{
    handlerMap[option.path] = createHandler(option);

    handlerMap[option.path].on('error', function (err) {
        console.error('Error:', err.message)
    })

    handlerMap[option.path].on('push', function (event) {
        console.log('Received a push event for %s to %s',
            event.payload.repository.name,
            event.payload.ref);
        run_cmd('sh', [`./${event.payload.repository.name}.deploy.sh`]);
    })
});

function run_cmd(cmd, args) {
    const spawn = require('child_process').spawn;
    const child = spawn(cmd, args);

    child.stdout.on('data', function (buffer) {
        console.log(buffer.toString());
    });
}

queryHouseInfo();

setInterval(queryHouseInfo,60 * 1000);

http.createServer(function (req, res) {
    handlerMap[req.url.split('?').shift()](req, res, function () {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777, function () {
    console.log('listening in 7777 ....')
});