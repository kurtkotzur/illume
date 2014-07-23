# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140723211515) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "days", force: true do |t|
    t.integer  "location_id",  null: false
    t.string   "name",         null: false
    t.time     "opening_time"
    t.time     "closing_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: true do |t|
    t.string   "name",                  null: false
    t.string   "category",              null: false
    t.string   "address",               null: false
    t.string   "ambience"
    t.boolean  "wifi"
    t.string   "attire"
    t.string   "noise_level"
    t.boolean  "wheelchair_accessible"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "average_stars"
  end

  create_table "reviews", force: true do |t|
    t.integer  "user_id",     null: false
    t.text     "body"
    t.integer  "num_stars"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "location_id", null: false
  end

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "session_token",   null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
