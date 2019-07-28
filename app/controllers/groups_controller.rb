class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  rescue_from ActiveRecord::RecordNotFound do |exception|
    redirect_to :root, alert: 'User not found'
  end
  
  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
  end  

  def new
    @group = Group.new
    @group.users << current_user
  end  
  
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end  
  
  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
  
  def set_group
    @group = Group.find(params[:id])
  end
end
