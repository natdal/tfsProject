class Coordinate < ActiveRecord::Base
  belongs_to :shelter

  validates :lat, presence: true
  validates :lon, presence: true
end
