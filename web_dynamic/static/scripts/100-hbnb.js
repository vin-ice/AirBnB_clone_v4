$(function() {
    const input = {"amenities": [], "states": [], "cities": []};
    const display = {"amenities": [], "states": [], "cities": []};

    $(".amenities input[type='checkbox']").change(function() {
        if ($(this).is(":checked"))
        {
            input["amenities"].push($(this).attr("data-id"));
            display["amenities"].push($(this).attr("data-name"));
            
        } else {
            input["amenities"].pop($(this).attr("data-id"));
            display["amenities"].pop($(this).attr("data-name"));
        }
        $(".amenities h4").text(display["amenities"].join(', '));
    });

    $(".states input[type='checkbox']").change(function() {
        if ($(this).is(":checked"))
        {
            input["states"].push($(this).attr("data-id"));
            display["states"].push($(this).attr("data-name"));
            
        } else {
            input["states"].pop($(this).attr("data-id"));
            display["states"].pop($(this).attr("data-name"));
        }
        $(".states h4").text(display["states"].join(', '));
    });

    $(".cities input[type='checkbox']").change(function() {
        if ($(this).is(":checked"))
        {
            input["cities"].push($(this).attr("data-id"));
            display["cities"].push($(this).attr("data-name"));
            
        } else {
            input["cities"].pop($(this).attr("data-id"));
            display["cities"].pop($(this).attr("data-name"));
        }
        $(".cities h4").text(display["states"].join(', '));
    });

    fetchStatus();

    fetchPlaces(undefined, updateDisplay);

    $("button[type='button']").on("click", function() { fetchPlaces(input, updateDisplay); });

    function updateDisplay(data=[]) {
        const displayPalette = $('SECTION.places');
        if (data.length > 0) {
            displayPalette.empty();
            for (let d of data) {
                const article = ['<article>', '<div class="title_box">', `<h2>${d.name}</h2>`,
                `<div class="price_by_night">${d.price_by_night}</div>`, '</div>',
                '<div class="information">',
                `<div class="max_guest">${d.max_guest} Guest(s)</div>`,
                `<div class="number_rooms">${d.number_rooms} Bedroom(s)</div>`,
                `<div class="number_bathrooms">${d.number_bathrooms} Bathroom(s)</div>`,
                '</div>',
                '<div class="description">',
                `${d.description}`,
                '</div>',
                '</article>'];
                $('SECTION.places').append(article.join(''));
            }
        }
    }
});

const API_URL = "http://0.0.0.0:5001/api/v1/";

function fetchStatus() {
    $.ajax({
        url: API_URL + "status/",
        method: "GET",
        success: function(res) { if (res.status === "OK") $("div#api_status").addClass("available"); },
        error: function(error) { console.log(error); }
    });
} 

function fetchPlaces(options = {}, cb) {
    $.ajax({
        url: API_URL + 'places_search/',
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        data: JSON.stringify(options),
        success: function(res) { cb(res); },
        error: function (error) { console.log(error); }
    });
}
