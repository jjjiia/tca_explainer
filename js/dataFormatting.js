function splitDataByDay(data){
    var byDate = {}
    
    for(var i in data){
        if(data[i].time!=undefined){
            var date = data[i].time.split("T")[0]       
            if(Object.keys(byDate).indexOf(date)>-1){
                byDate[date].push(data[i])
            }else{
                byDate[date]=[]
                byDate[date].push(data[i])
            }
        }
    }
   return byDate
}

function makeGidDictionary(data){
    var byGid = {}
    for(var i in data){
        if(data[i].gid!=undefined){
            var gid = data[i].gid    
            if(Object.keys(byGid).indexOf(gid)>-1){
                byGid[gid].push(data[i])
            }else{
                byGid[gid]=[]
                byGid[gid].push(data[i])
            }
        }
    }    
   return byGid
}
function formatGidsByDuration(data){
    var formatted = []
    for(var i in data){
        var td = 0
        for(var j in data[i]) {
            td = td+parseInt(data[i][j].duration)
        }
        formatted.push({id:i,duration:td})
    }
    
    var filtered = formatted.filter(function (d){return d.duration > 0*60*60; });
    return filtered
}

function colorGids(){
    var colorDictionary ={}
    for(var i in pub.gidByDuration){
        colorDictionary[pub.gidByDuration[i].id]=tractColors[i%(tractColors.length-1)]
    }
    console.log(colorDictionary)
    return colorDictionary
}

function timeStampToWeekDay(day){
    
   // var day = timestamp.split("T")[0]
    var d = new Date(day);
    var n = d.getDay()+1;
    var w = getWeek(d)
    if(n == 1){
    var w = getWeek(d)+1
    }
    return {week:w,day:n}
}
function getWeek(d){
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
       // return [d.getUTCFullYear(), weekNo];  
       return weekNo  
}

function getSeconds(timeStamp){
//    console.log(timeStamp)
    var h = parseInt(timeStamp.split(":")[0])
    var m = parseInt(timeStamp.split(":")[1])
    var s = parseInt(timeStamp.split(":")[2])
    return h*60*60+m*60+s
}