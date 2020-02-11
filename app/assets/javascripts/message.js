$(function(){
  function buildHTML(message){
    if(message.image){
      var html =
       `<div class="messageBox"  data-message-id=${message.id}>
          <div class="messageBox__data">
            <div class="messageBox__data__whose">
              ${message.user_name}
            </div>
            <div class="messageBox__data__when">
              ${message.created_at}
            </div>
          </div>
          <div class="messageBox__text">
            ${message.content}
          </div>
          <img src=${message.image} >
       </div>`
      return html;
    } else {
      var html =
       `<div class="messageBox"  data-message-id=${message.id}>
          <div class="messageBox__data">
            <div class="messageBox__data__whose">
              ${message.user_name}
            </div>
            <div class="messageBox__data__when">
              ${message.created_at}
            </div>
          </div>
          <div class="messageBox__text">
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
       $('.sendButton').prop('disabled', false);
     })
     .fail(function(){
       alert("メッセージ送信に失敗しました");
     });
  })
});