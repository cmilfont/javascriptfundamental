(function($) {
  Sammy = Sammy || {};
  Sammy.Eljs = function(app, method_alias) {
    var template = function(template, data, name) {
      var html = new Eljs({template:template}).parse(data);
      return html;
    };
    if (!method_alias) { method_alias = 'html'; }
    app.helper(method_alias, template);
   };
})(jQuery);