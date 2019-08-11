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
                    ${content}
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
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $("form")[0].reset('');
      function scrollBottom(){
        var target = $('.main__messages').last();
        var position = target.offset().top + $('.main__messages').scrollTop();
        $('.main__messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);　
    })
  })
});