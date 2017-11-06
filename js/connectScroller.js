var activateFunctions = [];
var updateFunctions = [];
var currentIndex = 0
var setupSections = function () {
    activateFunctions[0] = showTitle;
    activateFunctions[1] = locationMap;
    activateFunctions[2] = censusMap;
    activateFunctions[3] = calendar;
    activateFunctions[4] = daily;
    activateFunctions[5] = histogram;
    activateFunctions[6] = home;
    activateFunctions[7] = work;
    activateFunctions[8] = surroundingsHome;
    activateFunctions[9] = homeDropdown;
    activateFunctions[10] = allPlaces;
    activateFunctions[11] = allSurroundings;
    activateFunctions[12] = missing;
    activateFunctions[13] = matching;
    activateFunctions[14] = expanding;
    activateFunctions[15] = yourAtlas;
  };

function display(data) {
    
    var scroll = scroller().container(d3.select('#graphic'));
    scroll(d3.selectAll('.step'));
    setupSections()
    
    scroll.on('active', function (index) {
        d3.selectAll('.step')
            .style('opacity', function (d, i) { 
                return i === index ? 1 : 0.05; 
            });
            
        if(currentIndex != index){
            activateFunctions[index]()
            currentIndex = index
        }
    });
}