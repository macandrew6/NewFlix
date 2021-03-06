Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :movies, only: [:index, :show, :update]
    resources :genres, only: [:index, :show]
    resources :movie_genres, only: [:index]
    resources :user_movies, only: [:create, :index, :destroy]
  end
  
  root to: "static_pages#root"
end
