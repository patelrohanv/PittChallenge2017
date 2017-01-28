        var client;
        var request;
        var LUISApp = "7a780877-d55a-4fed-8532-9e39f7ef41e1";
        var LUISSub = "b749e49536724ecb88aa13a0569d37bd";

        function useMic() {
            return document.getElementById("useMic").checked;
        }

        function getMode() {
            return Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
        }

        function getKey() {
            return "ff805cfef6f24bfc97120993ca92a7f5";
            
        }

        function getLanguage() {
            return "en-us";
        }

        function clearText() {
            document.getElementById("output").value = "";
        }

        function setText(text) {
            document.getElementById("output").value += text;
            var parsed = text;
            
            
        }

        function getLuisConfig() {
            var appid = "7a780877-d55a-4fed-8532-9e39f7ef41e1";
            var subid = "b749e49536724ecb88aa13a0569d37bd";

            if (appid.length > 0 && subid.length > 0) {
                return { appid: appid, subid: subid };
            }

            return null;
        }

        function start() {
            var mode = getMode();
            var luisCfg = getLuisConfig();

            clearText();

            if (luisCfg) {
                    client = Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClientWithIntent(
                        getLanguage(),
                        getKey(),
                        luisCfg.appid,
                        luisCfg.subid);
                } else {
                    client = Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
                        mode,
                        getLanguage(),
                        getKey());
                }
                client.startMicAndRecognition();
                setTimeout(function () {
                    client.endMicAndRecognition();
                }, 5000);
        
            client.onPartialResponseReceived = function (response) {
                
            }

            client.onFinalResponseReceived = function (response) {
                
            }

            client.onIntentReceived = function (response) {
                console.log("its me again!");
                setText(response);
                var parsed = JSON.parse(response);
                parseResponse(parsed.entities);
                console.log(parsed);
            };

            function parseResponse(response){
                response.forEach(function(data){
                    switch(data.type){
                        case "howMany" : 
                            console.log("howMany: " + data.entity);
                            document.getElementById('numberOf').value = data.entity;
                            break;
                        case "perDay" :
                            console.log("perDay" + data.entity);
                            document.getElementById('perDay').value = data.entity;
                            break;
                        case "Frequency" :
                            console.log("Frequency: " + data.entity);
                            document.getElementById('freq').value = data.entity;
                            break;
                        default:
                            break;
                    }
                });
            }
        }