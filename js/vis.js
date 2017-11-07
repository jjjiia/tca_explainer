function setupGeoData(gidByDuration){
    var q = d3.queue();  
    for(var i in gidByDuration){
        q=q.defer(d3.json, "data/tract_geojson/"+gidByDuration[i].id+".json")
    }
    q.await(consolidateGeos);
}    


function consolidateGeos(error){
    if(error) { console.log(error); }
    pub.geoData = {type:"FeatureCollection",features:[]}
    d3.select("#loader").remove()
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i]!=undefined && arguments[i]!=null)
           { pub.geoData["features"].push({geometry:arguments[i].geometry})
            var geoid = arguments[i].properties.GEOID
//            pub.data[geoid]=arguments[i].properties.censusData
//            pub.geoNames[geoid]=arguments[i].properties.censusData["Geo_NAME"]
    }
        else{
            console.log("undefined")
        }
      }
      //pub.geoData = arguments
      initialVis()
      //return arguments
}

function initialVis(){
    //draw everything here and make opacity 0
      var width = $("#vis").width()
      var height = $("#vis").height()

//basemap
       var map = drawMapBoxTile()
       var projection = getD3(map)
        pub.map = map
        d3.selectAll(".mapboxgl-canvas").style("opacity",0)
      d3.selectAll(".mapboxgl-control-container").style("opacity",0) 
  //  moveMap([-74.010544,40.70],11)
//svg   
    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")
    
 //tracts  
    var tractPaths = svg.append("path").attr("class","tracts").attr("opacity",0)
    updateTracts(tractPaths,pub.geoData,projection,map,svg)

//points
    var points = svg.selectAll("circle").data(pub.points)
        .enter().append("circle").attr("class","points")
        .attr("r",2)
        .attr("opacity",0)
    updatePoints(points,pub.points,projection,map,svg)
        
//zoom objects with basemap
    d3.select(".mapboxgl-ctrl-bottom-right").remove()
    map.on("viewreset", function() {
        var projection = getD3(map)
        updateTracts(tractPaths,pub.geoData,projection,map,svg)
        updatePoints(points,pub.points,projection,map,svg)
    })
    map.on("move", function() {
        var projection = getD3(map)
        updateTracts(tractPaths,pub.geoData,projection,map,svg)
        updatePoints(points,pub.points,projection,map,svg)
    })
    
//calendar
    basicCalendar(pub.formattedByDay,svg)
    
//daily timeline
    dailyChanges(pub.formattedByDay,svg)

//histogram
     gidHistogram(pub.gidByDuration,svg)    
}
function moveMap(center,scale){
    pub.map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            center: center,
            zoom: scale,
            bearing: 0,

            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 0.2, // make the flying slow
            curve: 1, // change the speed at which it zooms out

            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
          //  easing: function (t) {
          //      return t;
          //  }
        })
}
function mapboxProjection(lonlat) {
     var p = map.project(new mapboxgl.LngLat(lonlat[0], lonlat[1]))
     return [p.x, p.y];
}
function getD3(map) {
      var bbox = document.body.getBoundingClientRect();
      var height = $("#vis").height()
      var width = $("#vis").width()
   //   console.log(width,height)
   //   var bbox = map.getCanvasContainer().getBoundingClientRect();
      var center = map.getCenter();
      var zoom = map.getZoom();
      // 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
      var scale = (512) * 0.5 / PI * pow(2, zoom);
  //  console.log([bbox.width,bbox.height])
      var d3projection = d3.geoMercator()
        .center([center.lng, center.lat])
      .translate([bbox.width/2, height/2])//bbox.height/2])
        .scale(scale);
      return d3projection;
}
function projectPoint(lon, lat, map) {
    var point = map.project(new mapboxgl.LngLat(lon, lat));
	return [point.x, point.y];
}
function getVP(map) {
    var bbox = document.body.getBoundingClientRect();
    var center = map.getCenter();
    var zoom = map.getZoom();
    var vp = ViewportMercator({
      longitude: center.lng,
      latitude: center.lat,
      zoom: zoom,
      width: bbox.width,
      height: bbox.height,
    })
    return vp;
}
function setProjection(){   
    var width = $("#vis").width()
    var height = $("#vis").height()
 //   var projection = d3.geoMercator().fitSize([width,height], pub.geoData)
   // pub.projection = projection
    console.log(projection.center())
}
function updatePoints(points,geoData,projection,map,svg){
    d3.selectAll(".points").data(geoData).attr("fill",colors[1])
    .attr("cx",function(d){
            return projection([d.lng,d.lat])[0]
        })
        .attr("cy",function(d){
            return projection([d.lng,d.lat])[1]
        })
        .attr("class",function(d){
            return "points"+" _"+ d.gid + " _"+ d.time.split("T")[0]
        })
}
function updateTracts(tractPaths,geoData,projection,map,svg){
    var path = d3.geoPath()
        .projection(projection);
  //  console.log(pub.gidByDuration)
    tractPaths.datum(geoData)
            .attr("d", path)
            .attr("fill",function(d){
                    return colors[1]
            })
            .attr("stroke","none")
}
function drawMapBoxTile(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiampqaWlhMTIzIiwiYSI6ImNpbDQ0Z2s1OTN1N3R1eWtzNTVrd29lMDIifQ.gSWjNbBSpIFzDXU2X5YCiQ'
    var map = new mapboxgl.Map({
        container: 'vis', // container id
        style: 'mapbox://styles/jjjiia123/cj9lqgjb01ukd2sqqn5e1zsqh',
        center: [-74.010544,40.70],
        zoom:9, 
        //maxZoom:20,
    //    minZoom:18,
      //  interactive: false
    })
    map.scrollZoom.disable()
    map.keyboard.disable();
    map.addControl(new mapboxgl.Navigation());
    pub.map = map
    return map
}
function drawBaseMap(){
    var width = $("#vis").width()
    var tiler = d3.tile()
        .size([width,width]);
    var projection = pub.projection
    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("#vis svg")
      

    svg.selectAll("path")
        .data(tiler
          .scale(projection.scale() * 2 * Math.PI)
          .translate(projection([0, 0])))
      .enter().append("g")
        .each(function(d) {
          var g = d3.select(this);
          d3.json("https://vector.mapzen.com/osm/roads/" + d[2] + "/" + d[0] + "/" + d[1] + ".json?api_key=mapzen-DoPocQK", function(error, json) {
            if (error) throw error;

            g.selectAll("path")
              .data(json.features.sort(function(a, b) { return a.properties.sort_key - b.properties.sort_key; }))
            .enter().append("path")
              .attr("class", function(d) { return d.properties.kind+" basemap"; })
              .attr("d", path)
            .attr("fill","none")
            .attr("stroke","#aaa");
          });
        });
}