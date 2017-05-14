var selectedCount = 0;
var selectedList = '';
var numberToSelect = 6;
var totalPages = 1;

function chooseImage(self, arg) {
    if (selectedCount == 0) {
        $("#footer").fadeIn().css("display", "block");

    }

    selectedList += '\n' + arg.full + '\n' + arg.thumb;

    selectedCount++;
    var progress = selectedCount / numberToSelect * 100;
    $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
    $('#progress-bar-message').text(selectedCount + "/" + numberToSelect+" Selected");

    $(self).removeClass("btn-success");
    $(self).text("Added");
    $(self).prop('disabled', true);

    if (selectedCount == numberToSelect) {
        $("#linkButton").removeClass("disabled");
    }
}

function search(newSearch) {
    if (newSearch) {
        document.getElementById('thumbnail-container').innerHTML = '';
        selectedCount = 0;
        selectedList = '';
        totalPages = 1;
        $("#footer").fadeIn().css("display", "none");
        
    }
    var foodType = document.getElementById("search-input").value;
    if (totalPages == 1) {
        selectedList = foodType;
        selectedList += '\n' + numberToSelect;
        $("#loadMoreButton").fadeIn().css("display", "block");
    }
   
    var k = "c5ccdca2dd5d93edf65f108cea17557b";
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + k + "&text=" + foodType + "&safe_search=1&per_page=12&page="+totalPages+"&sort=relevance";
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
    var thumbnailHTML = '';
    if (totalPages == 1) {
        thumbnailHTML = "<h2>Choose " + numberToSelect + " Images!</h2><br />";
    }
    
    $(response).find("photo").each(function () {
        var id = $(this).attr("id");
        var secret = $(this).attr("secret");
        var server = $(this).attr("server");
        var farm = $(this).attr("farm");

        var imageURL = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_z.jpg"
        var thumbURL = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_s.jpg"

        thumbnailHTML += "<div class='col-sm-6 col-md-4'><div class='thumbnail' >" +
            "<img src='" + imageURL + "' style='width:350px;height:250px'/><div class='caption'><button type='button' style='width:100%'" +
            " class='btn btn-success' onclick='chooseImage(this,{full:`" + imageURL + "`,thumb:`" + thumbURL+"`})' > Add to List</button ></div></div ></div >";
    });
    document.getElementById('thumbnail-container').innerHTML += thumbnailHTML;
}

function getLink() {
    var message = selectedList;
    var subject = "Hungry Data Builder";
    document.location.href = "mailto:hd910@outlook.com?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(message);
}

function loadMore() {
    totalPages++;
    search(false);
}
