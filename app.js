var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/apollo-webhook', secret: 'IAv38Q9uPyZTM2Pr' })

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777,function(){
   console.log('listening in 7777 ....')
});

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
})