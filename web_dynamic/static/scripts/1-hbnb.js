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
});