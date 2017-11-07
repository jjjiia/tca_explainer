var pub = {
  projection:null,
    geoData:null,
    gidByDuration:null,
    points:null,
    formattedByDay:null,
    map:null,
    colorGids:null,
    map:null
}
var PI = Math.PI;
var pow = Math.pow;
var tan = Math.tan;
var log = Math.log;
var atan = Math.atan;
var exp = Math.exp;
var DEGREES_TO_RADIANS = PI / 180;
var RADIANS_TO_DEGREES = 180 / PI;

var tractColors = ["#a853cd",
"#6db744",
"#676bde",
"#c3ad33",
"#7154a9",
"#5bbe7d",
"#d5439f",
"#3a7f4b",
"#df7eda",
"#69792c",
"#a3489b",
"#b0b062",
"#618fe6",
"#d78229",
"#36bddc",
"#cf4c2a",
"#50bba7",
"#dc3b75",
"#6aa2d8",
"#d13e4d",
"#4e68a5",
"#d99e64",
"#ae8fde",
"#92642a",
"#d78fc0",
"#e4836f",
"#9c5a8a",
"#a9554f",
"#e27495",
"#9f3d63"]