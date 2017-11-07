function getUniqueIds(data){
    var uniqueIds = []
    for(var i in data){
        var gid = data[i].gid
        if(uniqueIds.indexOf(gid)==-1){
            uniqueIds.push(gid)
        }
    }
    return uniqueIds
}
function basicCalendar(data,svg){
    var startDate = Object.keys(data)[0]
    var startWeek = timeStampToWeekDay(startDate).week
    var startday = timeStampToWeekDay(startDate).day
    
    var endDate = Object.keys(data)[Object.keys(data).length-1]
    var endWeek = timeStampToWeekDay(endDate).week
    
     var cell = 30
     var width = cell*(7+2)//$("#calendar").width()
     var height = cell*(endWeek-startWeek+3)
    
    var oScale = d3.scaleLinear().domain([-100,100]).range(["#ffffff",colors[1]])
    //var svg = d3.select("#vis svg")//.append("svg").attr("width",width).attr("height",height)
    svg.selectAll(".calendar")
        .data(Object.keys(data))
        .enter()
        .append("circle")
        .attr("class","calendar")
        .attr("r",cell/2-1)
//        .attr("height",cell-1)
        .attr("cx",function(d,i){
            return timeStampToWeekDay(d).day*cell
        })
        .attr("cy",function(d,i){
            return (timeStampToWeekDay(d).week-startWeek)*cell
        })
        //.attr("fill","none")
        .attr("fill",function(d,i){
            return colors[1]
        })
        .attr("fill",function(d){
            if(data[d].length>200){
                return oScale(200)
            }
            return oScale(data[d].length)
        })
        .attr("transform","translate(200,100)")
        .on("mouseover",function(d){
            d3.select(this).attr("fill","red")
            console.log(d)
            d3.selectAll("._"+d).attr("fill","red")
        })
        .on("mouseout",function(d){
            d3.select(this).transition().duration(1000).attr("fill",colors[1])
            d3.selectAll("._"+d).transition().duration(1000).attr("fill",colors[1])
        })
    var weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        
    svg.selectAll(".weekDay").data(weekdays).enter().append("text")
        .text(function(d){return d})
        .attr("y",20)
        .attr("x",function(d,i){return i*cell+cell})
        .attr("transform","translate(200,60)")
        .attr("text-anchor","middle")
        .attr("fill",function(d,i){
            return colors[1]
        })
        .attr("class","calendar")
      svg.append("text").text("number of tract changes per day for dates between 2017.09.18 - 2017.10.26")
        .attr("x",220).attr("y",60)  .attr("class","calendar")
    svg.selectAll("dayCounts")
        .data(Object.keys(data))
        .enter()
        .append("text")
        .attr("class","calendar")
        .text(function(d){
            return getUniqueIds(data[d]).length
            return data[d].length
        })
        .attr("x",function(d,i){
            return timeStampToWeekDay(d).day*cell//+cell/2
        })
        .attr("y",function(d,i){
            return (timeStampToWeekDay(d).week-startWeek)*cell+cell*.18
        })
        .attr("fill",function(d,i){
            return "#fff"
        })
        .attr("text-anchor","middle")
        .attr("transform","translate(200,100)")
        //.on("mouseover",function(d){
        //    d3.select(this).attr("fill","red")
        //    console.log(d)
        //    d3.selectAll("._"+d).attr("fill","red")
        //})
        //.on("mouseout",function(d){
        //    d3.select(this).transition().duration(1000).attr("fill",colors[1])
        //    d3.selectAll("._"+d).transition().duration(1000).attr("fill",colors[1])
        //})
        
        
        d3.selectAll(".calendar").attr("opacity",0)
}


function dailyChanges(data,svg){
     var width = 400
    var height = 800
     var seconds = 24*60*60
    //var svg = d3.select("#timeline").append("svg").attr("width",width).attr("height",height)
    var startDate = Object.keys(data)[0]
   // drawDay(data[startDate])
    var xScale = d3.scaleLinear().domain([0,seconds]).range([0,width*.8])
    var axis = d3.axisTop().scale(xScale)//.ticks(7)
    .tickValues([0,4*60*60,8*60*60,12*60*60,16*60*60,20*60*60,24*60*60])
    .tickFormat(function(d){
        return Math.round(d/60/60)
    })
    svg.append("text").text("time of day").attr("x",270).attr("y",295).attr("class","daily")
    svg.append("g")
          .attr("class", "y axis daily")
          .attr("transform", "translate(270,319)")
          .call(axis);
          
    var dayIndex =0
    for(var i in data){
        dayIndex+=1
      //  console.log(data[i])
        drawDay(data[i],svg,dayIndex)
       // break
    }
    d3.selectAll(".daily").attr("opacity",0)
        //console.log(data[Object.keys(data)[2]])
        //drawDay(data[Object.keys(data)[2]],svg,dayIndex)
}
function hidDay(){
    d3.selectAll(".daily").transition().attr("width",0).attr("x",500)
}
function drawDay(data,svg,dayIndex){
    var width = 400//$("#vis").width()
    var height = 20
     var seconds = 24*60*60
    var cell = width*.8/seconds
    var xScale = d3.scaleLinear().domain([0,seconds]).range([0,width*.8])
    //var svg = d3.select("#timeline").append("svg").attr("width",width).attr("height",height)
    svg.append("text").attr("x",0).attr("y",15).attr("class","daily")
        .text(data[0].time.split("T")[0])
        .attr("transform","translate(200,"+(300+dayIndex*20)+")")
    
    var dayClass = data[0].time.split("T")[0].split("-").join("_")
    var sec = getSeconds(data[0].time.split("T")[1].replace("Z",""))
    
    svg.selectAll("daily ._"+dayClass)
    .data(data)
    .enter() 
    .append("rect")
    .attr("class","daily ._"+dayClass)
    .attr("height",height-2)
    .attr("width",function(d,i){
        if(i==data.length-1){
            return width*.8- xScale(getSeconds(d.time.split("T")[1].replace("Z","")))
        }else{
            return cell*d.duration
        }
    })
    .attr("x",function(d){
       // console.log(getSeconds(d.time.split("T")[1].replace("Z","")))
        return xScale(getSeconds(d.time.split("T")[1].replace("Z","")))
    })
    .attr("y",0)
    .attr("fill",function(d,i){
        return pub.colorGids[d.gid]
        //console.log(i%(colors.length-1))
        return colors[i%(colors.length-1)]
    })
        .attr("transform","translate(270,"+(300+dayIndex*20)+")")
    
   // svg.append("rect").attr("width",xScale (seconds)).attr("height",20).attr("x",0).attr("y",0)
   // .attr("fill","none").attr("stroke","#aaa")
   // .attr("transform","translate(270,"+(300+dayIndex*20)+")")
}