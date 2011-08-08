var DJR = function() {
    this.ajax = function(action, args) {
        var json = args[0];
        var callback = args[1];
        jQuery.ajax({
            url: this.route[action].url,
            type: this.route[action].method,
            data: "objeto=" + JSON.stringify(json),
            success: function(retorno) {
                callback(retorno);
            },
            error: function() { console.log("Errors", arguments) }
        });
        
    }

    for (var action in this.route) {
        this[action]=function(act){
            return function() {
                this.ajax(act,arguments);
            }
        }(action);
    }
   };

function Cursos() {
    DJR.call(this);
}
Cursos.prototype.route = {
    index: {
        url : "/cursos", method: "GET"
    },
    create: {
        url : "/cursos", method: "POST"
    },
    update: {
        url : "/cursos/:id/", method: "PUT"
    },
    delete:{
        url : "/cursos/:id/", method: "DELETE"
    }
};