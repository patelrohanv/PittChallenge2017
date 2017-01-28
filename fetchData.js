
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
            data: '{"url":"https://rxtoolkitlabels.com/wp-content/uploads/2013/10/Vancomycin-Barcode-with-highlight1.jpg"}',
        })
        .done(function(data) {
            alert("success");
            var d = data.regions;
            var stuff = tryToPrintStuff(d);
            console.log(stuff);
            
            
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

    function callToFDA(code){
           $.getJSON('rest/disease/latest?&api_key=f929900216c19d0abddf952cc341c2d3Y&callback=?', function(data) {
            var output = '';
            $.each(data.results, function(key, val) {
            output += val.id + ' - ' + val.name + '\n';
            });
         });
        alert(output);
    }
    //..0409-6509-01

    //FDA API KEY : mWyxGz0B531XZ1BQ3YVuCBvWvvTMxua3Li7P5I0h
    //FDA URL https://api.fda.gov/drug/event.json?api_key=yourAPIKeyHere&search=
    //FDA Reference : https://open.fda.gov/api/reference/

    //Cancer seer API: f929900216c19d0abddf952cc341c2d3

 

