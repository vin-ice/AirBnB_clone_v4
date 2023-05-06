$(function() {
    const tag = $(".amenities h4");
    const input = {"amenities": []};
    const display = {"amenities": []};

    $(".amenities input[type='checkbox']").change(function() {
        if ($(this).is(":checked"))
        {
            input["amenities"].push($(this).attr("data-id"));
            display["amenities"].push($(this).attr("data-name"));
            
        } else {
            input["amenities"].pop($(this).attr("data-id"));
            display["amenities"].pop($(this).attr("data-name"));
        }
        tag.text(display["amenities"].join(', '));
    });

    fetchStatus();

    fetchPlaces();
});
const API_URL = "http://0.0.0.0:5001/api/v1/";

function fetchStatus() {
    $.ajax({
        url: API_URL + "status/",
        method: "GET",
        success: function(res) {
            if (res.status === "OK") $("div#api_status").addClass("available");
            else $("div#api_status").removeClass("available");
        },
        error: function(error) { console.log(error); }
    });
}  

function fetchPlaces() {
    $.ajax({
        url: API_URL + 'places_search/',
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        data: JSON.stringify({}),
        success: function(res) {
            for (let r of res) {
                const article = ['<article>', '<div class="title_box">', `<h2>${r.name}</h2>`,
                `<div class="price_by_night">${r.price_by_night}</div>`, '</div>',
                '<div class="information">',
                `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
                `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
                `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
                '</div>',
                '<div class="description">',
                `${r.description}`,
                '</div>',
                '</article>'];
                $('SECTION.places').append(article.join(''));
              }
        },
        error: function (error) {
            console.log(error);
        }
    });
}