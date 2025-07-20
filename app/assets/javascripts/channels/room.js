// App.room = App.cable.subscriptions.create "RoomChannel",
//   connected: ->
//     # Called when the subscription is ready for use on the server

//   disconnected: ->
//     # Called when the subscription has been terminated by the server

//   received: (data) ->
//     unless data.content.blank?
//       $('#messages-table').append '<div class="message">' +
//         '<div class="message-user">' + data.username + ":" + '</div>' +
//         '<div class="message-content">' + data.content + '</div>' + '</div>'

App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log("data.content", data.content)
    if (data.content.trim().length !== 0) {
      $("#messages-table").append("<div class='message'>" +
        "<div class='message-user'>" + data.username + ":" + "</div>" +
        "<div class='message-content'>" + data.content + "</div>" + "</div>");
      // window.scrollTo(0, document.body.scrollHeight);
      messageWindow = document.getElementById("messages")
      messageWindow.scrollTo(0, messageWindow.scrollHeight);
    }
  }
});