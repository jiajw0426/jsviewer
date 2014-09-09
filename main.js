var FileTypes={
    "js":"javascript",
    "javascript":"javascript",
    "xml":"xml",
    "css":"css",
    "java":"java",
    "sql":"sql",
    "html":"html",
    "htm":"html",
    "php":"php",

    "version":1.0

}

$(document).ready(


        function(){
            $("#themedropdwom").find("a").bind("click",function(){
                var style=$(this).attr("data-style");
                $.cookie("themestyle",style);
                var clazz="syntax-container"
                var baseStyles=Syntax.themes[style] ;
            for(var i=0;i<baseStyles.length;i++){
                clazz+=" syntax-theme-"+baseStyles[i];
            }
            clazz+=" syntax-theme-"+style;
            $(".syntax-container").removeClass().addClass(clazz);

            });
            function drop(e) {
                var files = e.dataTransfer.files;
                if (files === null || files === undefined) {
                    alert("Error!")
    return false;
                }


                var reader = new FileReader();
                var file=e.dataTransfer.files[0];
                try{
                    var name=file.name;
                    var type="javascript";
                    var index=name.lastIndexOf(".");
                    if(index!=-1){
                        type=name.substring(index+1);
                    }
                    if("class"==type){

                        reader.onload =function(e){
                           //alert(this.result.byteLength);
                        }
                        reader.readAsArrayBuffer(file);
                        e.preventDefault();
                    }else{

                        reader.onload =function(e){
                            parse(this.result,FileTypes[type]);
                        }
                        reader.readAsText(file);
                        e.preventDefault();
                    }
                }catch(e1){
                    $("#dragfile").modal("hide");
                }
                return false;
            }


            function dragEnter(e) {
                e.preventDefault();
            }

            function dragOver(e) {
                e.preventDefault();
            }

            function dragLeave(e) {
                e.stopPropagation();
            }

            function docDrop(e) {
                e.preventDefault();
                //$("#dragfile").modal("hide");
                $("#dragmsg").hide();
                $("#processMsg").show();

                return false;
            }

            function docEnter(e) {
                $("#dragmsg").show();
                $("#processMsg").hide();
                $("#dragfile").modal("show").css({
                    "margin-top":"100px" 
                });
                e.preventDefault();
                return false;
            }

            function docOver(e) {
                e.preventDefault();
                return false;
            }

            function docLeave(e) {
            }

            $(document).bind('drop', docDrop).bind('dragenter', docEnter).bind('dragover', docOver).bind('dragleave', docLeave);
            $("#dragAerea").bind('dragenter', dragEnter).bind('dragover', dragOver).bind('dragleave', dragLeave).get(0).addEventListener("drop", drop, false);
        }
);

var locattions=[];
function locate(where,from){
    var target=$(where);
    if(target.size()>0){
        $(document).scrollTop(target.position().top);
        if(from){
            locattions.push("#"+from);
        }

    }
}
function back(){
    var where=locattions.pop();
    if(where){
        locate(where);
    }
}
function parse(text,type){
    var theme=$.cookie('themestyle')||"bright";
    $("#carousel").hide();
    var type=type||"javascript";
    var mainContainer=$("#maincontainer");
    var syntaxContainer= $(".syntax-container",mainContainer).remove();
    $("<pre>").appendTo(mainContainer).addClass("syntax brush-"+type).text(text).hide();
    $("#myModal").modal("hide");

    jQuery.syntax({theme: theme, blockLayout: 'fixed'},function(options, html, container){
        $("#dragfile").modal("hide");
        return html;
    });


}


jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};



