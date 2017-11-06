//accordian
function makeAccordionTables(){
    d3.select("#chart").append("div").attr("id","accordion")
    var tables = Object.keys(pub.tablesInUse)
}    

function collapse(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      }
    }
    

    
}

function expand(){
    $( function() {
      $('#accordion').accordion({
        collapsible:true,
        heightStyle: 'content',
        create: function( event, ui ) {
          $('#accordion .ui-accordion-content').show();
        }
      });
    });
}