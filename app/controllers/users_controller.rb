class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound do |exception|
    redirect_to :root, alert: 'User not found'
  end

  def index
    @users = User.all
  end

  def new
    @users = User.all
  end
  
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end