require 'test_helper'

class SessionsHelperTest < ActionView::TestCase
    test "current_user" do
    user = users(:gyotaek)
    remember(user)
    assert_equal current_user, user
  end
end
