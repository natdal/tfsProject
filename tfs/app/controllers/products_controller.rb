class ProductsController < ApplicationController
	before_action :logged_in_user, only: [:create, :destroy]
	
	def show
	@product = Product.find(params[:id])	 
	end

	def new
	@product = Product.new
	end

	def index
		@user = User.find(current_user)
		@products = @user.products.paginate(page: params[:page])
	end

	
	def create
	@user = current_user
    	@product = @user.products.build(product_params)
    	if @product.save
      	
      	redirect_to @product
      	
    	else
      	@product = []
      	render 'static_pages/home'
    	end
  	end

 	private




  def product_params
      params.require(:product).permit(:name, :price, :picture, :picture2, :picture3)
    end

end
