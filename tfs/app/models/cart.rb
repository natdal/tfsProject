class Cart < ActiveRecord::Base
	acts_as_shopping_cart_using :cart_item
	belongs_to :user


	def tax_pct #부가세 가 있을경우 
    	10
  	end
end
