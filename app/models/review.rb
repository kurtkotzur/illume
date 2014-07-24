# == Schema Information
#
# Table name: reviews
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  date        :datetime         not null
#  body        :text
#  num_stars   :integer
#  created_at  :datetime
#  updated_at  :datetime
#  location_id :integer          not null
#

class Review < ActiveRecord::Base
  validates :user_id, :location_id, :date, null: false
  
  belongs_to(
    :location,
    class_name: "Location",
    foreign_key: :location_id,
    primary_key: :id
  )
  
  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  
  default_scope { order(created_at: :desc) }
end
