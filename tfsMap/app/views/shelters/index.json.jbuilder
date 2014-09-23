json.array!(@shelters) do |shelter|
  json.extract! shelter, :id, :name, :introduction, :classification, :grade, :cooldinate_lat, :cooldinate_lon
  json.url shelter_url(shelter, format: :json)
end
