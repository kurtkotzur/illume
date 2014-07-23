class Day < ActiveRecord::Base
  validates :location_id, :name, presence: true
  
  belongs_to(
    :location,
    class_name: "Location",
    foreign_key: :location_id,
    primary_key: :id
  )
end
  