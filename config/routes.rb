Rails.application.routes.draw do
  root :to => "users#show"
  
  namespace :api, defaults: { format: :json} do
    resource :session, only: [:create, :destroy, :new]  
    resources :users, only: [:create, :new, :show]
    resources :locations 
    resources :reviews
    resources :days, except: [:index]
  end
  
end