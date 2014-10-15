class TmapsController < ApplicationController
  before_action :set_tmap, only: [:show, :edit, :update, :destroy]

  # GET /tmaps
  # GET /tmaps.json
  def index
    @tmaps = Tmap.all
  end

  # GET /tmaps/1
  # GET /tmaps/1.json
  def show
  end

  # GET /tmaps/new
  def new
    @tmap = Tmap.new
  end

  # GET /tmaps/1/edit
  def edit
  end

  # POST /tmaps
  # POST /tmaps.json
  def create
    @tmap = Tmap.new(tmap_params)

    respond_to do |format|
      if @tmap.save
        format.html { redirect_to @tmap, notice: 'Tmap was successfully created.' }
        format.json { render :show, status: :created, location: @tmap }
      else
        format.html { render :new }
        format.json { render json: @tmap.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tmaps/1
  # PATCH/PUT /tmaps/1.json
  def update
    respond_to do |format|
      if @tmap.update(tmap_params)
        format.html { redirect_to @tmap, notice: 'Tmap was successfully updated.' }
        format.json { render :show, status: :ok, location: @tmap }
      else
        format.html { render :edit }
        format.json { render json: @tmap.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tmaps/1
  # DELETE /tmaps/1.json
  def destroy
    @tmap.destroy
    respond_to do |format|
      format.html { redirect_to tmaps_url, notice: 'Tmap was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tmap
      @tmap = Tmap.find(params[:id]).any ? Tmap.find(params[:id]) : [] 
      
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tmap_params
      params.require(:tmap).permit(:name, :classification, :coordinate_lat, :coordinat_lon)
    end
end
