json.(user, :username, :created_at, :address, :city, :state, :zip)
json.reviews user.reviews do |review|
  json.id review.id
  json.user_id review.user_id
  json.body review.body
  json.num_stars review.num_stars
  json.created_at review.created_at
  json.updated_at review.updated_at
  json.location_id review.location_id
  json.location review.location, :id, :name, :category, :address
  json.location_photo_url review.location.location_photo.url
end
json.favorites user.favorite_locations do |location|
  json.id location.id
  json.category location.category
  json.address location.address
  json.ambience location.ambience
  json.average_stars location.average_stars
  json.location_photo_url location.location_photo.url
  json.num_reviews location.reviews.count
end
json.photo_url user.user_photo.url