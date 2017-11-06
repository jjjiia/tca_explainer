  function showTitle(){
      var step = "title"
      d3.selectAll(".tracts").transition().duration(500).attr("opacity",0)
      d3.selectAll(".points").transition().duration(500).attr("opacity",0)
      d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",0)
    d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",0)
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
  }  
  function locationMap(){
        d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",1)
        d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",1)
        d3.selectAll(".points").transition().duration(500).attr("opacity",1)
        d3.selectAll(".tracts").transition().duration(500).attr("opacity",0)
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
  }
  function censusMap(){
    d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",1)
      d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",1)
      d3.selectAll(".tracts").transition().duration(500).attr("opacity",.3)
      d3.selectAll(".points").transition().duration(500).attr("opacity",0.1)
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",0)
  }
  function calendar(){
        d3.selectAll(".calendar").transition().duration(500).attr("opacity",1)
      
    d3.selectAll(".mapboxgl-canvas").transition().duration(500).style("opacity",.2)
      d3.selectAll(".mapboxgl-control-container").transition().duration(500).style("opacity",.2)
      d3.selectAll(".tracts").transition().duration(500).attr("opacity",0.3)
      d3.selectAll(".points").transition().duration(500).attr("opacity",0.1)
  
  }
  function daily(){
  }
  function histogram(){
  }
  function home(){
  }
  function work(){
  }
  function surroundingsHome(){
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
