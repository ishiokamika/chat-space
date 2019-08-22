$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="info" data-id="${message.id}">
                  <div class="info_upper">
                    <p class="info_user">
                      ${message.user_name}
                    </p>
                    <p class="info_date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message_text">
                    <div>
                    ${message.content}
                    </div>
                    ${img}
                  </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.main__messages').append(html);
      $("form")[0].reset('');
      $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
    })

    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    .always(function(message){
      $('.submit-btn').prop('disabled', false);
    })
  })
});

$ (function () {

  function buildHTML(message) {

    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="info" data-message-id="${message.id}">
                  <div class="info_upper">
                    <p class="info_user">
                      ${message.user_name}
                    </p>
                    <p class="info_date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message_text">
                    <div>
                    ${message.content}
                    </div>
                    ${image}
                  </div>
                </div>`
  return html;
  } 

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.info:last').data("message-id"); 
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.main__messages').append(insertHTML);
        })
        $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
    setInterval(reloadMessages, 5000);
});
