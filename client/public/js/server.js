/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 28.11.13
 * Time: 22:15
 * To change this template use File | Settings | File Templates.
 */


var server = function(){
    var so = {
        connect : function(playerHash) {
            this.socket = io.connect('http://localhost:8888');
            /*socket.on('news', function (data) {
             console.log(data);

             });*/
            this.socket.emit('init', { playerHash: playerHash });
            this.socket.emit('message', 'tobi', function(data){
                console.log("resp", data);
            });
        }
    }
    return so;
}();

