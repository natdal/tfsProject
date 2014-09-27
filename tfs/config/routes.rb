Rails.application.routes.draw do

#쉘터
  #resources :tmaps do
  #  resources :shelters, only: [:create, :index, :show, :new]
  #end
  resources :shelters

#카트
  resource :cart
#주문
  resources :orders
#테스트
  resources :tests
#상품
get 'product' => 'products#index'
resources :products do
      # get 'delete' => 'carts#destory'
end




#유저
  #root                 'static_pages#home'
  get    'help'     => 'static_pages#help'
  get    'about'    => 'static_pages#about'
  get    'contact'  => 'static_pages#contact'
  get    'signup'   => 'users#new'
  get    'login'    => 'sessions#new'
  delete 'logout'   => 'sessions#destroy'
  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :sessions,            only: [:new, :create, :destroy]
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]






#홈
  get 'home/popup'

  get 'home/test1'

  get 'home/sell_list'

  get 'home/sell_reg'

  get 'home/sell_main'

  get 'home/buy_basket'

  get 'home/buy_cancel'

  get 'home/buy_list'

  get 'home/sell_and_buy'

  get 'home/myhouse'

  get 'home/index'

  get 'home/item_info_view'

  get 'home/blog_view'

  get 'home/blog_list'


  root 'home#index'




#게시판
  #get 'board/index'
  #root 'board#index' #board 컨트롤러의 index액션을 기본 root로 설정

  #resources :bulletins
  #resources :posts
  #중첩 라우팅. RESTful URI로 들어오는 값을 중첩시킴
  resources :bulletins do #bulletins/:bulletin_id/posts(.:format) 요청에 따라 심볼에 매칭되는 부분은 params[]해쉬의 키로 사용되어 해당 파라미터의 값을 불러올 수 있게 된다. 여기선 params[:bulletin_id]
    resources :posts #post 모델 생성 라우팅 선언(리소스 라우팅이라고 함) - rake routes로 사용할 수 있는 라우트 확인
  end
  
  #get 'comments/create'
  #get 'comments/destroy'
  resources :posts do
    resources :comments, only: [:create, :destroy]#필요한 라우트는 create와 destroy 두개뿐
  end
end
