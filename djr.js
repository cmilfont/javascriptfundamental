Array.prototype.add = function(el) {
    this[this.length] = el;
    return this;
};

if(typeof Array.prototype.each == "undefined") {
  Array.prototype.each = function(fn) {
    for(var index = 0; index < this.length; index++) {
      fn(this[index], index);
    }
    return this;
  }
}

function toMap(object) {
    var arr = [];
    for(var item in object)
        arr[arr.length] = {key: item, value: object[item]};
    return arr;
};

var DJR = function() {
    this.data   = "";
    this.error  = {};
    this.format = ".json";

    this.formatURL = function(url, params) {
        toMap(params).each( function(param) {
            url = url.replace((new RegExp(param.key)).source, param.value);
        });
        return url;
    };
    this.callbackDefault = function(data) {
        this.data = data;
    };
    this.errorDefault    = function(error) {
        this.error = error;
    };
    this.ajax = function(object, callback, error, method, url, params) {
        var self = this;
        var params = params || [];
        params["\(.:format\)"] = this.format;

        if(method === "")
            method = "GET";

        toMap(object).each( function(param) {
            params[":" + param.key] = param.value;
        });
        if(method !== "GET") {
            object = JSON.stringify(object);
            if (object && object.length === 2)
                object = null;
        }

        jQuery.ajax({
            context     : self,
            data        : object,
            cache       : false,
            dataType    : 'json',
            error       : error,
            contentType : "application/json",
            headers     : {"Content-Type":"application/json",  "Accept":"application/json"},
            success     : callback,
            type        : method,
            url         : this.formatURL(url, params)
        });
    };
    for (var action in this.routes) {
        this[action] = function(act) {
            return function(object, callback, error) {
                if(typeof object === "function") {
                    callback = object;
                    error = callback;
                    object = {};
                }
                var localCallback     = callback || this.callbackDefault;
                var localErrorHandler = error    || this.errorDefault;
                this.ajax(object,
                          localCallback,
                          localErrorHandler,
                          this.routes[act].method,
                          this.routes[act].url);
                return this;
            }
        }(action);
    }

};

function CursosController() { DJR.call(this); }
CursosController.prototype.routes = {
    "show": {
        url: "/cursos/:id/", method: "GET"
    },
    "list": {
        url: "/cursos/", method: "GET"
    },
    "create": {
        url: "/cursos/", method: "POST"
    },
    "update" : {
        url: "/cursos/:id/", method: "PUT"
    },
    "delete": {
        url: "/cursos/:id/", method: "DELETE"
    }
}

/*
    var callback = function(cursos) {
        
        $("#top").html("").render({
            cursos: cursos || [{}]
        }, "curso", "template.html");
    
        $("a").click(function(){
            if($(this).text() === "Excluir") {
                cursosController.delete({
                    id: $(this).attr("name")
                }, function(){
                    cursosController.list({}, callback);
                }, errorHandler)
            }
    
            if($(this).text() === "Editar") {
                cursosController.show(
                    {id: $(this).attr("name")},
                    function(curso) {
                        $("form").populate(curso);
                    }
                )
            }
            return false;
        });
    
    };
*/