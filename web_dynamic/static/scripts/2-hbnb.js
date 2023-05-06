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
        let txt = display["amenities"].join(', ') || "Pool, Gym, ..."
        tag.text(txt);
    });

    fetchStatus();
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