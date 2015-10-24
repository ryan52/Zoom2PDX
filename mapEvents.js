/**
 * Created by Rohan on 10/23/2015.
 */

function addedPoint(name, district, rating) {
    // FIXME: append a data-point to data-container
    console.log(name + " (" + district + "): " + rating);
}

function loadedSchools(list){
    $('data-container').empty();
    if(list == null)
	return;
    var totalCount = 0, totalRating = 0;
    var expectedCount = list.length;
    var loadedAllSchools = function(average) {
	AddPoint('Average', '', average);
    }
    var loadedSchool = function(data) {
        var school = data.results;
	totalCount = totalCount + 1;
	var rating = calculate_score(school);
	totalRating = totalRating + rating;
	AddPoint(school.SchoolName, school.DistrictName, rating);
	if(totalCount != expectedCount) {
	    loadedAllSchools(totalRating / totalCount);
	}
    }
    for(var i = 0; i < list.length; i++) {
	get_school_data(list[i].SchoolID).done(loadedSchool);
    }
    return list;
}


function myApp(map){
    var noOfMiles = 3;
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