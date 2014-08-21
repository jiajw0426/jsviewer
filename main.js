$(document).ready(
        function(){
           $("#myModal").modal("show");
          $("#upload").click(
              function(){
                var mainContainer=$("#maincontainer");
                var syntaxContainer= $(".syntax-container",mainContainer).remove();
                $("<pre>").appendTo(mainContainer).addClass("syntax brush-javascript").text($("#content").val());
                $("#myModal").modal("hide");
                jQuery.syntax({theme: 'paper', blockLayout: 'fixed'});
              }
              );
        }
    );
function locate(where){
    var target=$(where);
    if(target.size()>0){
        $(document).scrollTop(target.position().top);
    }
}

