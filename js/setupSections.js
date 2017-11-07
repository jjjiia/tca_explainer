  function showTitle(){
        console.log("title")
        moveMap([-74.010544,40.70],11)
        //hide everything
        d3.selectAll(".tracts").transition().duration(500).attr("opacity",0)
        d3.selectAll(".points").transition().duration(500).attr("opacity",0)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",1)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",1)
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
      //maybe do a zoom fly
    
}  
  function locationMap(){
      //turn on basemp
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",.5)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",.5)
        d3.selectAll(".points").transition().duration(500).attr("opacity",1)
        d3.selectAll(".tracts").transition().duration(500).attr("opacity",0)
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
}
function censusMap(){
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",.3)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",.3)
        d3.selectAll(".tracts").transition().duration(500).attr("opacity",.3)
        d3.selectAll(".points").transition().duration(500).attr("opacity",0.1)
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
}
function calendar(){
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",1)
        d3.selectAll(".daily").transition().duration(500).attr("opacity",0)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",0)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",0)
        d3.selectAll(".tracts").transition().duration(500).attr("opacity",0)
        d3.selectAll(".points").transition().duration(500).attr("opacity",0)
}
function daily(){
        d3.selectAll(".daily").transition().duration(500).attr("opacity",1)
      //  d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",0)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",0)
        hideHistogram()
}
function histogram(){
        console.log("show histogram")
        updateHistogram()
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
        d3.selectAll(".home").transition().duration(500).attr("opacity",0)
        d3.selectAll(".work").transition().duration(500).attr("opacity",0)
        //d3.selectAll(".daily").transition().duration(500).attr("opacity",0)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",0)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",0)
    
}
function home(){
        d3.selectAll(".home").transition().duration(500).attr("opacity",1)
        d3.selectAll(".daily").transition().duration(500).attr("opacity",0)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",0)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",0)
        d3.select("")
        updateHistogram()
}
function work(){
        d3.selectAll(".home").transition().duration(500).attr("opacity",.5)
        d3.selectAll(".work").transition().duration(500).attr("opacity",1)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",0)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",0)
        updateHistogram()
}
function surroundingsHome(){
    hideHistogram()
      d3.selectAll(".home").transition().duration(500).attr("opacity",0)
      d3.selectAll(".work").transition().duration(500).attr("opacity",0)
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",.3)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",.3)
        moveMap([-74.010544,40.70],12)
}
function homeDropdown(){
}
function allPlaces(){
}
function allSurroundings(){
}
function missing(){
}
function matching(){
}
function expanding(){
}
function yourAtlas(){
}
