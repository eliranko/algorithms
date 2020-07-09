require 'test_helper'

class PathFinderControllerTest < ActionDispatch::IntegrationTest
  test "should get find" do
    get path_finder_find_url
    assert_response :success
  end

end
