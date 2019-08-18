class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound do |exception|
    redirect_to :root, alert: 'User not found'
  end

  def index
    @users = User.all
    @users = User.order('id ASC').limit(20)
  end

  def new
    @users = User.all
  end
  
  def edit
  end
      
  def search
    @users = User.where('name LIKE(?) and id != ?', "%#{params[:keyword]}%" ,current_user)
    respond_to do |format|
      format.html
      format.json
    end
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