class HomeController < ApplicationController
  def index
  	@shelters = Shelter.all
  end

  def item_info_view
  end

  def sell_list
  end

end
