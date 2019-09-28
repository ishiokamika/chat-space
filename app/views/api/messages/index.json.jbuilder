json.array! @messages do |message|
  json.content      message.content
  json.image        message.image.url
  json.date         message.simple_time(@test[:created_at] )
  json.user_name    message.user.name
  json.id           message.id
end