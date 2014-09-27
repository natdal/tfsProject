class Order < ActiveRecord::Base
	belong_to :product
	belong_to :user
end
