<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetSuccessful extends Mailable
{
    use Queueable, SerializesModels;

    public $instructor;

    public function __construct($instructor)
    {
        $this->instructor = $instructor;
    }

    public function build()
    {
        return $this->subject('Password Reset Successful')
                    ->view('emails.instructors_emails.password_reset_successful');
    }
}
