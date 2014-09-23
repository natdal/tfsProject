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

ActiveRecord::Schema.define(version: 20140923050237) do

  create_table "shelters", force: true do |t|
    t.string   "name"
    t.text     "introduction"
    t.string   "classification"
    t.string   "grade"
    t.string   "cooldinate_lat"
    t.string   "cooldinate_lon"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "shelter_id"
  end

  add_index "shelters", ["shelter_id"], name: "index_shelters_on_shelter_id"

  create_table "t_maps", force: true do |t|
    t.string   "name"
    t.string   "classification"
    t.string   "coordinate_lat"
    t.string   "coordinate_lon"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tmaps", force: true do |t|
    t.string   "name"
    t.string   "classification"
    t.string   "coordinate_lat"
    t.string   "coordinat_lon"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
