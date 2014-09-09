// brush: "javascript" aliases: ["js", "actionscript"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.
var uuidindex=0;
Syntax.register('javascript', function(brush) {
	var keywords = ["function", "break", "case", "catch", "continue", "default", "delete", "do", "else", "for", "if", "in", "instanceof", "new", "return", "super", "switch", "throw", "true", "try", "typeof", "var", "while", "with", "prototype"];
	
	var operators = ["+", "*", "/", "-", "&", "|", "~", "!", "%", "<", "=", ">"];
	var values = ["this", "true", "false", "null"];
	
	brush.push(values, {klass: 'constant'});
	brush.push(keywords, {klass: 'keyword'});
	brush.push(operators, {klass: 'operator'});
	
	// Regular expressions
	brush.push(Syntax.lib.perlStyleRegularExpression);
	
	// Camel Case Types
	brush.push(Syntax.lib.camelCaseType);
	
	// Comments
	brush.push(Syntax.lib.cStyleComment);
	brush.push(Syntax.lib.cppStyleComment);
	brush.push(Syntax.lib.webLink);
	
	// Strings
	brush.push(Syntax.lib.singleQuotedString);
	brush.push(Syntax.lib.doubleQuotedString);
	brush.push(Syntax.lib.stringEscape);
	
	// Numbers
	brush.push(Syntax.lib.decimalNumber);
	brush.push(Syntax.lib.hexNumber);
	
	// Functions


   
	brush.push({
		pattern:  /function(\s*)([a-z_][a-zA-Z0-9_]*)(\s*\()/gi,
		klass: 'color',
		process: function (element, match) {
            var reg= /function(\s*)([a-z_][a-zA-Z0-9_]*)(\s*\()/;
           
			var text = Syntax.innerText(element);
            element.innerText="";
            var result=text.match(reg);
            if(result==null||result.length<4){
                 return text;
            }
		    var funspan = document.createElement('span');
            funspan.className = 'keyword';
            funspan.innerText="function";
            element.appendChild(funspan);

            element.appendChild(document.createTextNode(result[1]));

            var fspan = document.createElement('span');
            fspan.className = 'function';
            fspan.id="fun_"+result[2];
            fspan.innerText=result[2];
            element.appendChild(fspan);

            element.appendChild(document.createTextNode(result[3]));


        
			return  element;
		}
	});
    
       brush.push({
           pattern:  /([a-z_][a-zA-Z0-9_]*)\s*:\s*([a-z_][a-zA-Z0-9_]*)\s*,/gi,
		klass: '',
		process: function (element, match) {
             var reg= /([a-z_][a-zA-Z0-9_]*\s*:\s*)([a-z_][a-zA-Z0-9_]*)(\s*,)/;
             var text = Syntax.innerText(element);
             var result=text.match(reg);
            
              if(result==null){
                   return  text;
            }
             element.innerText="";
             
            element.appendChild(document.createTextNode(result[1]));

             var funspan = document.createElement('a');
             var id=uuidindex++;
             funspan.id=id;
             funspan.href='javascript:locate("#'+'fun_'+result[2]+'","'+id+'")';
              funspan.className="function"
             funspan.innerText=result[2];
             element.appendChild(funspan);

            element.appendChild(document.createTextNode(result[3]));
			return  element;
		}
	});

     brush.push({
		pattern:  /([a-z_][a-zA-Z0-9_]*)(\s*\()/gi,
		klass: '',
		process: function (element, match) {
             var reg= /([a-z_][a-zA-Z0-9_]*)(\s*\()/;
             var text = Syntax.innerText(element);
             var result=text.match(reg);
            
              if(result==null||result[1]=="function"){
                   return  text;
            }
             element.innerText="";
             
             var funspan = document.createElement('a');
             var id=uuidindex++;
             funspan.id=id;
             funspan.href='javascript:locate("#'+'fun_'+result[1]+'","'+id+'")';
              funspan.className="function"
             funspan.innerText=result[1];
             element.appendChild(funspan);
            element.appendChild(document.createTextNode(result[2]));
			return  element;
		}
	});

     brush.push({
		pattern:  /([a-z_][a-zA-Z0-9_]*)\s*=\s*function(\s*\()/gi,
		klass: '',
		process: function (element, match) {
            var reg=  /([a-z_][a-zA-Z0-9_]*)(\s*=\s*)function(\s*\()/;
           
			var text = Syntax.innerText(element);
            element.innerText="";
            var result=text.match(reg);
            if(result==null||result.length<4){
                return text;
            }
		    var funspan = document.createElement('span');
            funspan.className = 'function';
            funspan.id="fun_"+result[1];
            funspan.innerText= result[1];
            element.appendChild(funspan);

             var oper = document.createElement('span');
             oper.className = 'operator';
             oper.id="fun_"+result[2];
             oper.innerText= result[2];
            element.appendChild( oper);

          var fspan = document.createElement('span');
            fspan.className = 'keyword';
            fspan.innerText="function";
            element.appendChild(fspan);

           

            element.appendChild(document.createTextNode(result[3]));


        
			return  element;
		}
	});
    

});

