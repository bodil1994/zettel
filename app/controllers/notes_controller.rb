class NotesController < ApplicationController
  require 'algolia'
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  def index

    @notes = roots
    @breadcrumbs = create_breadcrumbs([], prepare_data).compact
    if params[:ids].present?
      @notes = current_user.notes
      @notes = @notes.select{ |x| params[:ids].include?(x.id.to_s)}
    end
  end

  def new
    @note = Note.new
  end

  def edit
  end

  def tree_data
    render json: prepare_data
  end

  def create_breadcrumbs(breadcrumbs, data)
    # breadcrumbs.concat data[:breadcrumbs] unless data[:breadcrumbs].nil?
    unless data[:children].blank?
      data[:children].each do |child|
        breadcrumbs << {id: child[:id], path: child[:breadcrumbs]}
        create_breadcrumbs(breadcrumbs, child)
      end
    end
    breadcrumbs
  end

  def prepare_data
    nodes = roots.map do |note|
      {
        id: note.id,
        breadcrumbs: [{ id: note.id, label: note.title, current: false }],
        title: note.title,
        children: []
      }
    end
    data = { title: "All my notes", children: tree_children(nodes) }
  end

  def tree_children(nodes)
    nodes.each do |node|
      next if Note.find(node[:id]).children.blank?
      Note.find(node[:id]).children.each do |child|
        node_child = { id: child.id, breadcrumbs: node[:breadcrumbs], title: child.title, children: [] }
        node_child[:breadcrumbs] << { id: child.id, label: child.title, current: false }
        node[:children] << node_child
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
    Note.all.select {|note| note.root? && note.user == current_user}
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
