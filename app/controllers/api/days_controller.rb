module Api
  class DaysController < ApiController
    def create
      @day = Day.new(day_params)
      
      if @day.save
        render json: @day
      else
        render json: @day.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      @day = Day.find(params[:id])
      @day.try(:destroy)
      render json: {}
    end
    
    def index
      @days = Day.all
      render json: @days
    end
    
    def show
      @day = Day.find(params[:id])
      
      render json: @day
    end
    
    private
    
    def day_params
      params.require(:day).permit(
        :location_id,
        :name,
        :opening_time,
        :closing_time
      )
    end
  end
end