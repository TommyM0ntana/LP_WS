require 'test_helper'

class LandingPageControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get landing_page_home_url
    assert_response :success
  end

  test "should get contact" do
    get landing_page_contact_url
    assert_response :success
  end

end
