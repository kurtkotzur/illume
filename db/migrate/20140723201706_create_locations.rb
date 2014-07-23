class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.string :address, null: false
      t.string :ambience
      t.boolean :wifi
      t.string :attire
      t.string :noise_level
      t.boolean :wheelchair_accessible
    end
  end
end
