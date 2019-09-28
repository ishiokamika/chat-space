json.id      @message.id
json.content @message.content 
json.date    @message.simple_time(@test[:created_at] )
json.user_name @message.user.name
json.image   @message.image.url