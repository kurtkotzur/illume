Rails.application.routes.draw do
  root :to => "users#show"

  resource :session, only: [:create, :destroy, :new]  
  resources :users, only: [:create, :new, :show]
  resources :locations
  resources :reviews
  resources :days

end