json.(@location, :id, :name, :category, :address, :ambience, :wifi, :attire, :noise_level,
:wheelchair_accessible, :created_at, :updated_at, :average_stars, :cleanness,
:good_for_kids, :good_for_groups, :outdoor, :latitude, :longitude)
json.location_photo_url @location.location_photo.url