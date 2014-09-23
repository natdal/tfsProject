json.array!(@tmaps) do |tmap|
  json.extract! tmap, :id, :name, :classification, :coordinate_lat, :coordinat_lon
  json.url tmap_url(tmap, format: :json)
end
