//    http://www.socialexplorer.com/pub/reportdata/HtmlResults.aspx?reportid=R11506590

queue()
	.defer(d3.csv,"data/tract_lat_lng_time_duration.csv")
//	.defer(d3.csv,"../data/R11506590_SL140.csv")
//    .defer(d3.json,"../data/tables_dictionary_now.json")
    .await(dataDidLoad);
function dataDidLoad(error,places) {
    pub.points = places
    var formattedDays = splitDataByDay(places)
    pub.formattedByDay = formattedDays   
    var formattedGids = makeGidDictionary(places)
    var gidArray = Object.keys(formattedGids)
    
    
    
    var gidByDuration = formatGidsByDuration(formattedGids)
    pub.gidByDuration = gidByDuration
    var sortedIds = Object.keys(gidByDuration).sort(function(a,b){
        return gidByDuration[b] - gidByDuration[a];
    });
    
   // initialVis(gidByDuration)
    setupGeoData(gidByDuration)
    display(places)
    
    
//    gidHistogram(sortedIds,gidByDuration)
//    basicCalendar(formattedDays)
//    dailyChanges(formattedDays,formattedGids)
//    console.log(seDictionary)
//    console.log(data)
}

var pub = {
    geoData:null
}

var colors = ["#7dde49",
"#69b95a",
"#59e7a5",
"#46ac84",
"#79b0a5"]

