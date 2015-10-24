/**
 * Created by Rohan on 10/23/2015.
 */
//Function from added point displaying name, district, and rating.
function addedPoint(name, district, rating) {
<<<<<<< HEAD
    console.log(name+district+rating); //console.log writes a message to the console
    $("#data").append('"<div class="data-point">'+name+"   "+district
=======
    console.log(name+district+rating);
<<<<<<< HEAD
    $("#data").append('<div class="data-point"><b>'+name+'</b>'
										 +((district!="") ? ' ('+district+')' : '')+'</div>'
										 +'<div id="'+name.replace(/\s+/g,"")+'" class="data-bar school-bar" style="width:0;" >'
										 +'</div><br>');
		$("#data #"+name.replace(/\s+/g,"")).animate({width:rating*40}, 1000, "swing");
=======
    $("#data").append('<div class="data-point">'+name+"   "+district
>>>>>>> 64809f8867d616a24dacdf8c4de55d8e7961c6d2
        +'<div class="data-bar school-bar" style="width:'+rating+'px;">'
																	+'</div></div>');
>>>>>>> 1a84e0b93a12eb7c64657764e45e9f31a3025ad5
}
//Loaded schools will show total ratings
function loadedSchools(list){
    $('#data').empty();
    if(list == null)
	return;
    var totalCount = 0, totalRating = 0;
    var expectedCount = list.length;
    var loadedAllSchools = function(average) {
	addedPoint('Average School Score', '', average);
    }
    var loadedSchool = function(data) {
        var school = data.results;
	totalCount = totalCount + 1;
	var rating = calculate_score(school);
	totalRating = totalRating + rating;
	addedPoint(school.SchoolName, school.DistrictName, rating);
	if(totalCount == expectedCount) {
	    loadedAllSchools(totalRating / totalCount);
	}
    }
    for(var i = 0; i < list.length; i++) {
    if(list[i].SchoolID == "0"){
        expectedCount--;
    }
    else {
        get_school_data(list[i].SchoolID).done(loadedSchool);}
    }
    return list;
}

//Map function includes: 'click', position (latitude, longitude), and displays
//schools nearby the location
function myApp(map){
    var noOfMiles = 1;
    var noOfMetres = noOfMiles * 1609.34;
    map.addListener('click', function(p) {
        if (window.lastCircle != null){
            window.lastCircle.setMap(null);
        }
        var myPos = {lat: p.latLng.lat(), lng: p.latLng.lng()};
        console.log(p);
        console.log(p.latLng.lat(), p.latLng.lng());

        // Add the circle for this city to the map.
        window.lastCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: myPos,
            radius: noOfMetres
        });
        get_schools_by_location(myPos.lat,myPos.lng,noOfMiles).done(
            function(data){
                loadedSchools(data.results);
            });
    });

}
