// Client ID and API key from the Developer Console
var CLIENT_ID = '738895255720-pdj0knsqv5rvptde01rhtkduaq2nk4c8.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

function addToCalendar() {
    console.log("here1");
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var startDateTime = date+' '+time;
    var thisTimeZone = today.getTimezoneOffset;
    
    var freq = Document.getElementById("freq").value;
    var amt = Document.getElementById("amt").value;
    for(var i = 1; i <= freq; i++ ){
        console.log("here");
        var event = {
          'summary': '',
          'start': {
            'dateTime': '',
            'timeZone': ''
          },
          'end': {
            'dateTime': '',
            'timeZone': ''
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=30'
          ],
        };

        event.summary = "Take " + amt + " tablets/pills";
        event.start.dateTime = startDateTime;
        event.start.dateTime.setHours(event.start.dateTime.getHours() + i);
        event.start.timeZone = thisTimeZone;
        
        event.end.dateTime = thisTimeZone;
 event.end.dateTime.setHours(event.end.dateTime.getHours() + i);  event.end.dateTime.setMinutes(event.end.dateTime.getMinutes() + 30);

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'sve7g5a9jaeae21kl80p18suns@group.calendar.google.com',
          'resource': event
        });
    }
}

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
