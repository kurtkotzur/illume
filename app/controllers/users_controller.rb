class UsersController < ApplicationController
  before_action :require_signed_in!, :only => [:show]
  before_action :require_signed_out!, :only => [:create, :new]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def index
    @users = User.all
    
    render 'index.json.jbuilder'
  end

  def show
    if params.include?(:id)
      @user = User.find(params[:id])
      render json: @user #TODO: make jbuilder file
    else
      redirect_to user_url(current_user)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :address, :city, :state, :zip, :user_photo)
  end
end