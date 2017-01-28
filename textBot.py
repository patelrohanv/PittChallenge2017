From twilio.rest import TwilioRestClient
accountSid = ACd79be66d0f4e49dd3cecd0486730ffa3
authToken = 80fe45a4928ad87f046734b685bfe1e5
twilioClient = TwilioRestClient(accountSid, authToken)
myTwilioNumber = <twilio_sender_number>
destCellPhone = <verified_receiver_number>
myMessage = twilioClient.messages.create(body = "whatever", from_=myTwilioNumber, to=destCellPhone)