;(function($){

    var _workflow = function(config, el) {
        var $form = el,
            _createAction = config.create || "create",
            _updateAction = config.update || "update";

        var _executeAction = function(json) {
            var _action  = _createAction,
                _url     = config.templateCreate,
                _success = config.successCreate;
            if(json.id) { 
                _action  = _updateAction;
                _url     = config.templateUpdate;
                _success = config.successUpdate;
            }
            config.controller[_action](json, function(){
                $.get(_url, function(template){
                    var html = new Eljs({template:template}).parse(json);
                    _success(html);
                });
            });
        };

        return function(){
            var json = $form.getJSON();
            _executeAction(json);
            return false;
        }
    };
    
    var mapearEdit = function(config, el) {
        $("a").click(function(){
            var id = $(this).attr("href").replace(/\D/g, "");
            config.controller.show({
                id: id
            }, function(json){
                $(el).populate(json);
            });
        });
    };

    var listagem = function(config, el) {

        $.get(config.templateList, function(template) {

            config.controller.list({}, function(cursos){
                for(var x = 0; x < cursos.length; x++){
                    var json = cursos[x];
                    var html = new Eljs({template:template}).parse(json);
                    config.successList(html, el);
                }
                mapearEdit(config, el);
            });

        })
    };

    $.fn.extend({
        workflow: function(config){
            var el = $(this);
            $(this).submit(_workflow(config, el));
            listagem(config, el);
        }
    });

})(jQuery);

$(function() {
    $("form").workflow({
        templateList: "row.html",
        templateCreate: "row.html",
        templateUpdate: "template.html",
        controller: new CursosController(),
        successCreate: function(fragmento){
            var $table = $("#top table tbody");
            $table.append(fragmento);
        },
        successUpdate: function(fragmento){
            $("#top").html(fragmento);
        },
        successList: function(fragmento) {
            var $table = $("#top table tbody");
            $table.append(fragmento);
        }
    });
});