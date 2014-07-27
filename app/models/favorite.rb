class Favorite < ActiveRecord::Base
  validates :user_id, :location_id, presence: true
  
  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  
  belongs_to(
    :location,
    class_name: "Location",
    foreign_key: :location_id,
    primary_key: :id
  )
end