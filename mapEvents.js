/**
 * Created by Rohan on 10/23/2015.
 */
//Function from added point displaying name, district, and rating.
function addedPoint(name, district, rating) {
    console.log(name+district+rating);
    $("#data").append('<div class="data-point"><b>'+name+'</b>'
										 +((district!="") ? ' ('+district+')' : '')+'</div>'
										 +'<div id="'+name.replace(/\s+/g,"")+'" class="data-bar school-bar" style="width:0;" >'
										 +'</div><br>');
		$("#data #"+name.replace(/\s+/g,"")).animate({width:rating*40}, 1000, "swing");

}

function filter_list(item){
    return item.SchoolID !== 0
}
function sort_list(item1,item2){
    return item1.SchoolName >= item2.SchoolName;
}

//Loaded schools will show total ratings
function loadedSchools(list){
    $('#data').empty();
    //list.push({SchoolID: 0});
    //console.log(list);
    var listForSchools=[];
    if(list == null)
	    return;

    var totalCount = 0, totalRating = 0;
    var expectedCount = list.length;

    var loadedAllSchools = function(average) {
        list = list.filter(filter_list);
        //console.log("list2", list);
        list = list.sort(sort_list);

        list.forEach(function(item){
            addedPoint(item.SchoolName,'',item.rating);
        });
	    addedPoint('Average School Score', '', average);
    }

    var loadedSchool = function(data){
        var school = data.results;
        var rating = calculate_score(school);

        for (var i = 0; i < list.length; i++) {
            if(list[i].SchoolID == school.SchoolID){
                list[i].rating = rating;
            }
        }

        totalCount = totalCount + 1;
        totalRating = totalRating + rating;

        // listForSchools.push(obj);
        //addedPoint(school.SchoolName, school.DistrictName, rating);
        if(totalCount == expectedCount) {
            //console.log("in the if");
            loadedAllSchools(totalRating / totalCount);
        }
        //console.log(totalCount,expectedCount);
    }


    for(var i = 0; i < list.length; i++) {
        if(list[i].SchoolID == "0"){
        expectedCount--;
        }
        else {
            get_school_data(list[i].SchoolID).done(loadedSchool);
        }
    }
    return list;
}

//Map function includes: 'click', position (latitude, longitude), and displays
//schools nearby the location
function myApp(map){
    var noOfMiles = 1; //Set variable to 1
    var noOfMetres = noOfMiles * 1609.34; //1 Mile = 1609.34 Meres
    map.addListener('click', function(p) {
        //DELETES LAST CIRCLE ON SECOND CLICK
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
