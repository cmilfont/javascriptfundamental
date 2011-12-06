var Cursos = function() {

    var list = function(context){

        this.partial("template_form.html")
            .load("row2.html")
            .then(function(){
                this.load("/cursos", {cache:false}, function(lista){
                    var template = this.previous_content;
                    lista.forEach(function(curso){
                        var html = Mustache.to_html(template, curso);
                        $("#top table tbody").append(html);
                    });
                });
            });
    };

    var edit = function(context){
        var id = this.params.id;
        this.load("/cursos/"+id, function(curso){
            //this.render("row2.html", curso).swap();
            $("form").populate(curso);
        });
    };

    var create = function(context) {
        this.load("row2.html")
            .then(function(){
console.dir(this);
                var template = this.content;
                new CursosController().create($("form").getJSON(), 
                    function(curso){
                        var html = Mustache.to_html(template, curso);
                        $("#top table tbody").append(html);
                });
            });
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
        
        this.use(Sammy.Mustache, 'html');
        this.get('#!/home', function(context) {});

        this.get('#!/cursos', Cursos.list);
        this.get('#/cursos/:id/edit', Cursos.edit);
        this.post('#!/create_curso', Cursos.create);
        
    });
    
    $(function() {
        app.run('#!/home');
    });

})(jQuery);