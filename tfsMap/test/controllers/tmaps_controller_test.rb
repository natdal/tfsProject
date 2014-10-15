require 'test_helper'

class TmapsControllerTest < ActionController::TestCase
  setup do
    @tmap = tmaps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tmaps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tmap" do
    assert_difference('Tmap.count') do
      post :create, tmap: { classification: @tmap.classification, coordinat_lon: @tmap.coordinat_lon, coordinate_lat: @tmap.coordinate_lat, name: @tmap.name }
    end

    assert_redirected_to tmap_path(assigns(:tmap))
  end

  test "should show tmap" do
    get :show, id: @tmap
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tmap
    assert_response :success
  end

  test "should update tmap" do
    patch :update, id: @tmap, tmap: { classification: @tmap.classification, coordinat_lon: @tmap.coordinat_lon, coordinate_lat: @tmap.coordinate_lat, name: @tmap.name }
    assert_redirected_to tmap_path(assigns(:tmap))
  end

  test "should destroy tmap" do
    assert_difference('Tmap.count', -1) do
      delete :destroy, id: @tmap
    end

    assert_redirected_to tmaps_path
  end
end
