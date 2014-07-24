module Api
  class ReviewsController < ApiController
    def create
      @review = Review.new(review_params)
      @review.user_id = current_user.id
      if @review.save
        render json: @review
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      @review = Review.find(params[:id])
      @review.try(:destroy)
      render json: {}
    end
    
    def index
      @reviews = Review.all
      render json: @reviews
    end
    
    def show
      @review = Review.find(params[:id])
      
      render json: @review
    end
    
    private
    
    def review_params
      params.require(:review).permit(
        :user_id,
        :location_id,
        :body,
        :num_stars
      )
    end
    
  end
end