$(document).ready(function(){
  console.log('Ready');

  
  $('#btnMessage').click(()=>{
    let message=$('#messageBox').val();
    let data = { message }

    $.get('/message', data, function(){
    })
  })

  // handles retrieval of messages
  
  setInterval(()=>{
  $.get('/messages', function(messages){
    $('#messages').empty();
    //console.log(messages);
    messages.forEach((message)=>{
$('#messages').append('<div class="row">'+message.message+'</div>');
  })
})
  },1000)
})