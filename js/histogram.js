function updateHistogram(){
    console.log("update histo")
   var max = pub.gidByDuration[0].duration
    var min = pub.gidByDuration[pub.gidByDuration.length-1].duration
    var xScale = d3.scaleLinear().domain([min,max]).range([0,300])
    d3.selectAll(".histogram").data(pub.gidByDuration).transition().duration(500)
    .attr("width",function(d){
    //    console.log(d)
            return xScale(d.duration)
        })
    d3.selectAll(".histogram").transition().delay(500).attr("opacity",1)
        
}
function hideHistogram(){  
    d3.selectAll(".histogram").data(pub.gidByDuration).transition().duration(500)
    .attr("width",0)
    d3.selectAll(".histogram").transition().delay(500).attr("opacity",0)
  
}

function gidHistogram(gidByDuration,svg){
    var cell = 20
   // var height = sortedIds.length*cell
  //  var svg = d3.select("#histogram").append("svg").attr("width",width).attr("height",height)
   var max = gidByDuration[0].duration
    var min = gidByDuration[gidByDuration.length-1].duration
    var xScale = d3.scaleLinear().domain([min,max]).range([0,300])
    svg.append("text").text("Top Census Tracts")
        .attr("x",650).attr("y",295)
        .attr("class","histogram")
    
    var axis = d3.axisTop().scale(xScale)//.ticks(7)
        .tickValues([0,max])
        .tickFormat(function(d){
            return Math.round(d/60/60)
        })
        
    svg.append("g")
        .attr("class","histogram y axis")
          .attr("transform", "translate(650,318)")
          .call(axis);
      
    svg.selectAll("rect .histogram")
        .data(gidByDuration)
        .enter()
        .append("rect")
        .attr("class","histogram")
        .attr("x",0)
        .attr("y",function(d,i){return i*cell})
        .attr("height",cell-2)
        .attr("width",function(d){
            return 0
            return xScale(d.duration)
        })
        .attr("fill",function(d){
           return pub.colorGids[d.id]
        })
          .attr("transform", "translate(650,320)")
        
    svg.append("text").text("Home").attr("x",xScale(gidByDuration[0].duration)+5).attr("y",15)
          .attr("transform", "translate(650,320)").attr("class","home")
    svg.append("text").text("Work").attr("x",xScale(gidByDuration[1].duration)+5).attr("y",15+20)
          .attr("transform", "translate(650,320)").attr("class","work")
    svg.append("text").text("Work").attr("x",xScale(gidByDuration[1].duration)+5).attr("y",55)
          .attr("transform", "translate(650,320)").attr("class","work")
        
        
        d3.selectAll(".histogram").attr("opacity",0)
      d3.selectAll(".work").attr("opacity",0)
      d3.selectAll(".home").attr("opacity",0)
        
}
