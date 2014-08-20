$(document).ready(
        function(){ 
          $("#upload").click(
              function(){
                $("#pager").text($("#content").val());
                $("#myModal").modal("hide");
                jQuery.syntax({theme: 'paper', blockLayout: 'fixed'});
              }
              );
        }
    );


