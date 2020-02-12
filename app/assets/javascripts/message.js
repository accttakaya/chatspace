$(function(){

  function buildHTML(message){
    if (message.content && message.image) {
      var html = 
       `<div class="message-box"  data-message-id=${message.id}>
          <div class="message-box__data">
            <div class="message-box__data__whose">
              ${message.user_name}
            </div>
            <div class="message-box__data__when">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box__text">
            ${message.content}
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else if (message.content) {
      var html =
        `<div class="message-box"  data-message-id=${message.id}>
           <div class="message-box__data">
             <div class="message-box__data__whose">
               ${message.user_name}
             </div>
             <div class="message-box__data__when">
               ${message.created_at}
             </div>
           </div>
           <div class="message-box__text">
             ${message.content}
           </div>
         </div>` 
      return html;
    } else if (message.image) {
      var html =
       `<div class="message-box"  data-message-id=${message.id}>
          <div class="message-box__data">
            <div class="message-box__data__whose">
              ${message.user_name}
            </div>
            <div class="message-box__data__when">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box__text">
            ${message.content}
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message-box"  data-message-id=${message.id}>
          <div class="message-box__data">
            <div class="message-box__data__whose">
              ${message.user_name}
            </div>
            <div class="message-box__data__when">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box__text">
            ${message.content}
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.message-list').append(html);
       $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
       $('form')[0].reset();
     })
     .fail(function(){
       alert("メッセージ送信に失敗しました");
     })
     .always(function(){
      $('.send-button').prop('disabled', false);
     });
  });
  var reloadMessages = function() {
    last_message_id = $('.message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages,7000);
  }
});