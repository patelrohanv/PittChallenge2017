$(function() {
        var params = {
            // Request parameters
            "language": "unk",
            "detectOrientation ": "true",
        };

        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","830020d92fb14f0093eab73a877befc2");
            },
            type: "POST",
            // Request body
            data: '{"url":"http://medlibrary.org/lib/images-rx/adderall-2/7ad6983d-1e30-450e-8122-26418ae6efed-01.jpg"}',
        })
        .done(function(data) {
            var d = data.regions;
            var stuff = tryToPrintStuff(d);
            console.log(stuff);
            
            makeCorsRequest();
            
            
        })
        .fail(function() {
            alert("error");
        });
    });

    function tryToPrintStuff(data){
        var checkWord = false;
        for(var arrayItem in data){
            var checkLine = data[arrayItem];
            for(var arrayStuff in checkLine){
                var checkStuff = checkLine[arrayStuff];
                for(var words in checkStuff){
                    var searchWords = checkStuff[words];
                    for(word in searchWords){
                        var hope = searchWords[word];
                        for(key in hope){
                        
                            if(checkWord == true){
                                return hope[key].text;
                            }
                            if(hope[key].text == "NDC"){
                                checkWord = true;
                            }
                            
                        }
                    }
                }
            }
        }
    }

   /* function callToFDA(code){

        $.ajax({
            //url: "https://api.seer.cancer.gov/rest/ndc/code/0002-3227",
            url: "	https://api.seer.cancer.gov/rest/disease/latest?type=HEMATO&q=basophilic",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Access-Control-Request-Method", "GET");
                xhrObj.setRequestHeader("X-SEERAPI-Key","f929900216c19d0abddf952cc341c2d3");
            },
            type: 'GET',
            success: function(data){
                console.log("success");
            },
            error: function(error){
                console.log("error");
            }
    });
    } */

    // Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://api.seer.cancer.gov/rest/ndc/code/0002-3227?api_key=f929900216c19d0abddf952cc341c2d3&callback=?';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
    //..0409-6509-01

    //FDA API KEY : mWyxGz0B531XZ1BQ3YVuCBvWvvTMxua3Li7P5I0h
    //FDA URL https://api.fda.gov/drug/event.json?api_key=yourAPIKeyHere&search=
    //FDA Reference : https://open.fda.gov/api/reference/

    //Cancer seer API: f929900216c19d0abddf952cc341c2d3

 

