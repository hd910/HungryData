$(document).ready(function () {

});

function search() {
    var foodType = document.getElementById("search-input").value;
    var k = "c5ccdca2dd5d93edf65f108cea17557b";
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + k + "&text=" + foodType + "&safe_search=1&per_page=12&sort=relevance";
    if (foodType != null && foodType != '') {
        $.ajax({
            method: "GET",
            url: url,
            dataType: 'xml',
            success: function (response) {
                xmlParser(response);
            }
        });
    }
}

function xmlParser(response) {
    var thumbnailHTML = "";
    $(response).find("photo").each(function () {
        var id = $(this).attr("id");
        var secret = $(this).attr("secret");
        var server = $(this).attr("server");
        var farm = $(this).attr("farm");

        var imageURL = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_z.jpg"
        var thumbURL = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_s.jpg"

        thumbnailHTML += "<div class='col-sm-6 col-md-4'><div class='thumbnail' >" +
            "<img src='" + imageURL + "' style='width:350px;height:250px'/><div class='caption'><button type='button' style='width:100%'" +
            "class='btn btn-success' > Add to List</button ></div></div ></div >";
    });
    document.getElementById('thumbnail-container').innerHTML = thumbnailHTML;

    console.log(thumbnailHTML);
}