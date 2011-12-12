var Cursos = function() {
    var controller = new CursosController();
    
    var list = function(context){
        this.load("/cursos", {cache:false}, function(lista){
            	this.renderEach("row2.html", lista).replace("#top table tbody");
            });
         $('form :input').val("");
    };
    
    var edit = function(context){
        this.load("/cursos/" + this.params.id, function(curso){
            $("form").populate(curso);
        });
    };
    
    var callback = function(){
    	var context = this;
    	return function(curso) {
    		var $tr = $("td:contains('" + curso.id + "')").closest("tr");
    		if($tr.length > 0) {
    			context
    			    .render("row2.html", curso)
    			    .then(function(cxt){
    			        $tr.html($(cxt).html());
    			    });
    		} else {
    			context.render("row2.html", curso).appendTo("#top table tbody");
    		}
    	};
    }
    
    var create = function(context) {
    	var json = $("form").getJSON();
        if(json.id) {
            controller.update(json, callback.call(context) );
        } else {
            controller.create(json, callback.call(context) );
        }
        return false;
    }
    
    return {
        list: list,
        edit: edit,
        create: create
    };
    
}();

(function($) {
    var app = $.sammy('#conteudo', function() {
        this.use(Sammy.Eljs, 'html');
        this.get('#!/home', function(){});
        this.get('#!/cursos',         Cursos.list);
        this.before({except: {path: '#!/create_curso'}}, Cursos.list);
        this.get('#/cursos/:id/edit', Cursos.edit);
        this.post('#!/create_curso',  Cursos.create);
    });
    $(function() { 
        app.run('#!/home');
    });
})(jQuery);