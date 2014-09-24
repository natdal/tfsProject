class CoordinatesController < ApplicationController

  before_action :set_shelter
  before_action :set_coordinate, only: :destroy


  def create
  	@coordinate = @shelter.coordinates.new(coordinate_params)
    @coordinate.save
  end

  def destroy
  	@coordinate.destroy
  end


  private

  def set_shelter
    @shelter = Shelter.find(params[:shelter_id])
  end

  def set_coordinate
    @coordinate = @shelter.coordinates.find(params[:id])
  end

  def coordinate_params
    params.require(:coordinate).permit(:lat,:lon)
  end
end
