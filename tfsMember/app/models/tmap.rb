class Tmap < ActiveRecord::Base
	has_many :shelters, dependent: :destroy
end
