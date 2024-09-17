<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerifiedConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $instructor;

    public function __construct($instructor)
    {
        $this->instructor = $instructor;
    }

    public function build()
    {
        return $this->subject('Registration Complete')
                    ->view('emails.instructors_emails.email_verified_confirmation');
    }
}
