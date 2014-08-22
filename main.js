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

            function drop(e) {
                var files = e.dataTransfer.files;
                if (files === null || files === undefined) {
                    alert("Error!")
    return false;
                }


                var reader = new FileReader();
                var file=e.dataTransfer.files[0];
                var name=file.name;
                var type="javascript";
                var index=name.lastIndexOf(".");
                if(index!=-1){
                    type=name.substring(index+1);
                }
                
                reader.readAsText(file);
                reader.onload =function(e){
                    parse(this.result,FileTypes[type]);
                }
                e.preventDefault();
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
                $("#dragfile").modal("hide");
                return false;
            }

            function docEnter(e) {
                $("#dragfile").modal("show").css({
                    "margin-top":"100px" 
                });

                ;
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
function locate(where){
    var target=$(where);
    if(target.size()>0){
        $(document).scrollTop(target.position().top);
    }
}
function parse(text,type){
    var type=type||"javascript";
    var mainContainer=$("#maincontainer");
    var syntaxContainer= $(".syntax-container",mainContainer).remove();
    $("<pre>").appendTo(mainContainer).addClass("syntax brush-"+type).text(text);
    $("#myModal").modal("hide");
    jQuery.syntax({theme: 'paper', blockLayout: 'fixed'});

}




