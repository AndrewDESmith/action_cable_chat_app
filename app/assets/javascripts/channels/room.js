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
    document.getElementById("message_content").value.trim();
    if (data.content.trim().length !== 0) {
      $("#messages-table").append("<div class='message'>" +
        "<div class='message-user'>" + data.username + ":" + "</div>" +
        "<div class='message-content'>" + data.content + "</div>" + "</div>");
      scroll_to_last_message();
    }
  }
});

document.addEventListener("turbolinks:load", () => {
  message_submission_button = document.getElementById("new_message").querySelector("input[type='submit']");
  submit_message(message_submission_button);
});

submit_message = (message_submission_button) => {
  document.getElementById("message_content").addEventListener("keydown", (event) => {
    if (event.keyCode == "13") {
      message_submission_button.click();
      event.target.value = "";
      // Prevents insertion of newline.
      event.preventDefault();
    }
  });
}

scroll_to_last_message = () => {
  messageWindow = document.getElementById("messages")
  messageWindow.scrollTo(0, messageWindow.scrollHeight);
}