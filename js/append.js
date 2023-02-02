$(document).ready(function () {
    $.get({url:"./index.html",async:true}, function (data) {
        let response = data !== "" && data;
        $('body').append(response);
    });
});

