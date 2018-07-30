
var pageToken = "";
var isLoading = false;
var debounceTimeout;

$("#keyword").on("input", function () {

    

    var keyword = $("#keyword").val();
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(function () {
        if (keyword) {
            $("#result-list").html("");
            $(".lds-ring").css("opacity", "1");
            
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                type: 'GET',
                success: function (respone) {
                    if (respone.items.length == 0) {
                        $("#result-list").html("<p>No More Result !</p>");
                        $(".lds-ring").css("opacity", "0");
                    } else {
                        for (var i = 0; i < respone.items.length; i++) {

                            if (respone.items[i].id.kind == "youtube#video") {
                                $("#result-list").append(`
                                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${respone.items[i].id.videoId}?autoplay=true" target="_blank">
                                <img src="${respone.items[i].snippet.thumbnails.high.url}" alt="">
                                <div class="video_info">
                                    <h2 class="title">${respone.items[i].snippet.title}</h2>
                                    <p class="description">${respone.items[i].snippet.description}</p>
                                    <span>View </span>
                                </div>
                            </a>
                            `)
                            }
                        }
                    }

                }

            });
        } else {
            $("#result-list").html("");
            $(".lds-ring").css("opacity", "0");
        }
    }, 1000);




})

$(window).on("scroll", function () {
    if ($(document).height() - ($(window).height() + $(window).scrollTop()) < 300) {
        if (!isLoading && pageToken != null) {
            isLoading = true;

            var keyword = $("#keyword").val();

            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pageToken}`,
                type: 'GET',
                success: function (respone) {
                    pageToken = respone.nextPageToken ? respone.nextPageToken : null;

                    for (var i = 0; i < respone.items.length; i++) {
                        if (respone.items[i].id.kind == "youtube#video") {
                            $("#result-list").append(`
                            <a class="result col-md-12" href="https://www.youtube.com/watch?v=${respone.items[i].id.videoId}?autoplay=true" target="_blank">
                            <img src="${respone.items[i].snippet.thumbnails.high.url}" alt="">
                            <div class="video_info">
                                <h2 class="title">${respone.items[i].snippet.title}</h2>
                                <p class="description">${respone.items[i].snippet.description}</p>
                                <span>View </span>
                            </div>
                        </a>
                        `)
                        }
                    }
                    isLoading = false;
                }

            });
        }
    }
})