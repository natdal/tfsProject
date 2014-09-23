Rails.application.routes.draw do

  resources :shelters

  #resources :tmaps
  #resources :shelters
  resources :tmaps do
    resources :shelters
  end

  get 'commerce/sell_and_buy'

  get 'home/index'

  get 'home/item_info_view'

  get 'home/blog_view'

  get 'home/blog_list'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'




end
