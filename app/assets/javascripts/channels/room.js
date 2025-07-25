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

    if (data.mention) {
      alert("You have a new mention @" + data.user.username);
    }

    if(data.message && data.message.trim().length !== 0) {
      messages_table = document.getElementById("messages-table");
      messages_table.insertAdjacentHTML("beforeend", data.message)
      scroll_to_last_message();
    }
  }
});

document.addEventListener("turbolinks:load", () => {
  scroll_to_last_message();
  message_submission_button = document.getElementById("new_message").querySelector("input[type='submit']");
  submit_message(message_submission_button);
});

submit_message = (message_submission_button) => {
  document.getElementById("message_content").addEventListener("keydown", (event) => {
    if (event.keyCode == "13" && !event.shiftKey) {
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