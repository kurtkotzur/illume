Rails.application.routes.draw do
  root :to => "static_pages#root"
  
  resource :session, only: [:create, :destroy, :new]  
  resources :users, only: [:create, :new, :show, :index]
  
  namespace :api, defaults: { format: :json} do
    resources :locations do
      resources :reviews, only: [:index]
    end
    resources :users, only: [] do
      resources :reviews, only: [:index]
    end
    resources :reviews, except: [:index]
    resources :days, except: [:index]
  end
  
end