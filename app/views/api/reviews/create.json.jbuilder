json.(@review, :user_id, :body, :num_stars, :created_at, :location_id)
json.user @review.user, :id, :username, :city, :state
json.user_photo_url @review.user.user_photo.url