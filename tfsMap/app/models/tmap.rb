class Tmap < ActiveRecord::Base
	extend FriendlyId
	friendly_id :classification

	has_many :shelters, dependent: :destroy


end
