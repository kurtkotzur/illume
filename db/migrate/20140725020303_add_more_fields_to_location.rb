class AddMoreFieldsToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :cleanness, :string
    add_column :locations, :good_for_kids, :boolean, default: false
    add_column :locations, :good_for_groups, :boolean, default: false
    add_column :locations, :outdoor, :boolean, default: false
  end
end
