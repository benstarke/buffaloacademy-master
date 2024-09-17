<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ImageUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public $instructor;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($instructor)
    {
        $this->instructor = $instructor;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.instructors_emails.imageUpdated')
                    ->subject('Profile Image Updated Successfully')
                    ->with('instructor', $this->instructor);
    }
}
