json.array!(@shelters) do |shelter|
  json.extract! shelter, :id, :name, :introduction, :classification, :grade
  json.url shelter_url(shelter, format: :json)
end
