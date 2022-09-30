class NotesController < ApplicationController
  def index
    @notes = current_user.notes
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    @note.user = current_user

    if @note.save!
      redirect_to notes_path
    else
      render :new
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :content)
  end
end
