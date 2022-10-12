class NotesController < ApplicationController
  require 'algolia'
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  def index

    @notes = current_user.notes
    @roots = roots

    if params[:ids].present?
      @notes = @notes.select{ |x| params[:ids].include?(x.id.to_s)}
    end
  end

  def new
    @note = Note.new
  end

  def edit
  end

  def tree_data
    nodes = roots.map do |note|
      {
        id: note.id,
        title: note.title,
        children: []
      }
    end
    data = { title: "All my notes", children: tree_children(nodes) }
    render json: data
  end

  def tree_children(nodes)
    nodes.each do |node|
      next if Note.find(node[:id]).children.blank?
      Note.find(node[:id]).children.each do |child|
        node[:children] << { id: child.id, title: child.title, children: []}
      end
      tree_children(node[:children])
    end
  end


  def create

    note = Note.new(title: note_params[:title], content: note_params[:content])
    note.user = current_user

    if note.save!
      # Create Relationship with Children
      Relationship.create!(child_id: note_params[:child_ids], parent_id: note[:id]) unless note_params[:child_ids].blank?
      # Create Relationship with Parents
      Relationship.create!(child_id: note[:id], parent_id: note_params[:parent_ids]) unless note_params[:parent_ids].blank?
    else
      render :new
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :content, :parent_ids, :child_ids)
  end

  def roots
    Note.all.select {|note| note.root?}
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
