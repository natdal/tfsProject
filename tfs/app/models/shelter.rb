class Shelter < ActiveRecord::Base
	has_many :coordinates, dependent: :destroy
end
