require 'test_helper'

class MessageTest < ActiveSupport::TestCase

  def setup
    @user = users(:example)
    @message = @user.messages.build(content: "Lorem ipsum @#{@user.username}")
  end

  test "should be valid" do
    assert @message.valid?, @message.errors.full_messages
  end

  test "should not be blank" do
    @message.content = " "
    assert !@message.valid?
  end

  test "should include mentions" do
    assert_not @message.mentions.empty?
    assert @message.mentions.first.username, @user.username
  end
end
