import json
import twilio
import sys

from twilio.rest import TwilioRestClient


class Patient(object):
    def __init__(self, drug, freq, interval, amt, phone):
        self.drug = drug
        self.freq = freq
        self.interval = interval
        self.amt = amt
        self.phone = phone

#request = json.load(sys.stdin)
#response = handle_request(request)
#print("Content-Type: application/json", end="\n\n")
#json.dump(response, sys.stdout, indent=2)

#replace phone with a phone number
patient = Patient("tylenol", 2, "daily", 4, phone)
#replace <your_account_sid> with your accountSid
#accountSid = <your_account_sid>
accountSid = ""
#replace <your_auth_token> with your auth_token
#authToken = <your_auth_token>
authToken = ""
twilioClient = TwilioRestClient(accountSid, authToken)
#replace <twilio_sender_number> with your twilio number
#myTwilioNumber = <twilio_sender_number>
myTwilioNumber = 0 
#the destination cell number will be passed in from the json
destCellPhone = patient.phone

myMessage = twilioClient.messages.create(body = "Remember to take " + str(patient.amt) + " " + patient.drug + " " + str(patient.freq) + " times " + patient.interval, from_=myTwilioNumber, to=destCellPhone)
