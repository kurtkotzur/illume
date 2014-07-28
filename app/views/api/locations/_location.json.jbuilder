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
  json.user review.user, :id, :username, :city, :state
  json.user_photo_url review.user.user_photo.url
end
json.favorite_users location.favorite_users do |user|
  json.id user.id
  json.username user.username
  json.city user.city
  json.state user.state
  json.user_photo_url user.user_photo.url
end
json.favorites location.favorites do |favorite|
  json.id favorite.id
  json.user_id favorite.user_id
  json.location_id favorite.location_id
end
json.photo_url location.location_photo.url