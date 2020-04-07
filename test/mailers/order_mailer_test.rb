require 'test_helper'

class OrderMailerTest < ActionMailer::TestCase
  test "order_email" do
    mail = OrderMailer.order_email
    assert_equal "Order email", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
