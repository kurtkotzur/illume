module Api
  class FavoritesController < ApiController
    def create
      @favorite = Favorite.new(favorite_params)
      @favorite.user_id = current_user.id
      
      if @favorite.save
        render json: @favorite
      else
        render json: @favorite.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      @favorite = Favorite.find(params[:id])
      @favorite.try(:destroy)
      render json: {}
    end
    
    def index
      if params[:user_id]
        @favorites = Favorite.where(user_id: params[:user_id])
      elsif params[:location_id]
        @favorites = Favorite.where(location_id: params[:location_id])
      end
      
      render json: @favorites
    end
    
    def show
      @favorite = Favorite.find(params[:id])
      render json: @favorite
    end
    
    private
    
    def favorite_params
      params.require(:favorite).permit(:user_id, :location_id)
    end
  end
end