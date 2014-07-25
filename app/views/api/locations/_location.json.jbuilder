json.(location, :id, :name, :category, :address, :ambience, :wifi, :attire, :noise_level,
:wheelchair_accessible, :created_at, :updated_at, :average_stars, :cleanness,
:good_for_kids, :good_for_groups, :outdoor)
json.reviews location.reviews do |review|
  json.id review.id
  json.user_id review.user_id
  json.body review.body
  json.num_stars review.num_stars
  json.created_at review.created_at
  json.updated_at review.updated_at
  json.location_id review.location_id
  json.user review.user, :id, :username
end
json.photo_url location.location_photo.url