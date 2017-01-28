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
            data: '{"url":"http://medlibrary.org/lib/images-rx/morphine-sulfate-11/morphine-sulfate-injection-anda-6.jpg"}',
        })
        .done(function(data) {
            var d = data.regions;
            var stuff = tryToPrintStuff(d);
            
        callCSV(stuff);
            
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

    function callCSV(code){
        var myString = `[
  {
    "PRODUCTID": "0409-6509_44e1fb49-2a7f-4149-acc9-27d362047c71",
    "PRODUCTNDC": "0409-6509",
    "PRODUCTTYPENAME": "HUMAN PRESCRIPTION DRUG",
    "PROPRIETARYNAME": "Vancomycin Hydrochloride",
    "PROPRIETARYNAMESUFFIX": "",
    "NONPROPRIETARYNAME": "VANCOMYCIN HYDROCHLORIDE",
    "DOSAGEFORMNAME": "INJECTION, POWDER, LYOPHILIZED, FOR SOLUTION",
    "ROUTENAME": "INTRAVENOUS",
    "STARTMARKETINGDATE": 20050606,
    "ENDMARKETINGDATE": "",
    "MARKETINGCATEGORYNAME": "ANDA",
    "APPLICATIONNUMBER": "ANDA063076",
    "LABELERNAME": "Hospira, Inc.",
    "SUBSTANCENAME": "VANCOMYCIN HYDROCHLORIDE",
    "ACTIVE_NUMERATOR_STRENGTH": 500,
    "ACTIVE_INGRED_UNIT": "mg/10mL",
    "PHARM_CLASSES": "Glycopeptide Antibacterial [EPC],Glycopeptides [Chemical/Ingredient]",
    "DEASCHEDULE": ""
  },
  {
    "PRODUCTID": "0143-9908_23f89437-006e-4487-b224-f48045dab0b5",
    "PRODUCTNDC": "0143-9908",
    "PRODUCTTYPENAME": "HUMAN PRESCRIPTION DRUG",
    "PROPRIETARYNAME": "NAPROXEN",
    "PROPRIETARYNAMESUFFIX": "",
    "NONPROPRIETARYNAME": "naproxen sodium",
    "DOSAGEFORMNAME": "TABLET, FILM COATED",
    "ROUTENAME": "ORAL",
    "STARTMARKETINGDATE": 19960514,
    "ENDMARKETINGDATE": "",
    "MARKETINGCATEGORYNAME": "ANDA",
    "APPLICATIONNUMBER": "ANDA074480",
    "LABELERNAME": "West-Ward Pharmaceutical Corp",
    "SUBSTANCENAME": "NAPROXEN SODIUM",
    "ACTIVE_NUMERATOR_STRENGTH": 550,
    "ACTIVE_INGRED_UNIT": "mg/1",
    "PHARM_CLASSES": "Cyclooxygenase Inhibitors [MoA],Nonsteroidal Anti-inflammatory Compounds [Chemical/Ingredient],Nonsteroidal Anti-inflammatory Drug [EPC]",
    "DEASCHEDULE": ""
  },
  {
    "PRODUCTID": "0641-6126_a5957925-ce8b-4bbc-97ff-99600bbda304",
    "PRODUCTNDC": "0641-6126",
    "PRODUCTTYPENAME": "HUMAN PRESCRIPTION DRUG",
    "PROPRIETARYNAME": "Morphine Sulfate",
    "PROPRIETARYNAMESUFFIX": "",
    "NONPROPRIETARYNAME": "Morphine Sulfate",
    "DOSAGEFORMNAME": "INJECTION",
    "ROUTENAME": "INTRAVENOUS",
    "STARTMARKETINGDATE": 20150603,
    "ENDMARKETINGDATE": "",
    "MARKETINGCATEGORYNAME": "ANDA",
    "APPLICATIONNUMBER": "ANDA205758",
    "LABELERNAME": "West-Ward Pharmaceuticals Corp.",
    "SUBSTANCENAME": "MORPHINE SULFATE",
    "ACTIVE_NUMERATOR_STRENGTH": 8,
    "ACTIVE_INGRED_UNIT": "mg/mL",
    "PHARM_CLASSES": "Full Opioid Agonists [MoA],Opioid Agonist [EPC]",
    "DEASCHEDULE": "CII"
  }
]`
var obj = JSON.parse(myString);
var smallCode = code.substring(0, 9)
console.log(smallCode);
for(var key in obj){
    if(obj[key].PRODUCTNDC == smallCode){
        console.log(obj[key].PROPRIETARYNAME);
        
    }
}
    }
