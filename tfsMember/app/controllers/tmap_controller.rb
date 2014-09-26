class TmapController < ApplicationController
  before_action :set_shelter
  before_action :set_tmap

  def index
  end

  def show
  end

  def create
  	@tmap = @shelter.tmaps.new(tmap_params)
    @tmap.save
  end

  def new
  end



  private

  def set_tmap
    @tmap = Tmap.find(params[:tmap_id])
  end

  def set_shelter
    @shelter = @tmap.shelters.find(params[:id])
  end

  def tmap_params
    params.require(:tmap).permit(:lonlat, :type)
  end
end
