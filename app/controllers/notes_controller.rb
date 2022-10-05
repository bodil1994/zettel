class NotesController < ApplicationController
  def index
    @notes = current_user.notes
    @roots = roots
  end

  def new
    @note = Note.new
  end

  def test

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
end
