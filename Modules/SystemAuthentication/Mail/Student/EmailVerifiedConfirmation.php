<?php

namespace Modules\SystemAuthentication\Mail\Student;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerifiedConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $student;

    public function __construct($student)
    {
        $this->student = $student;
    }

    public function build()
    {
        return $this->subject('Registration Complete')
                    ->view('emails.students_emails.email_verified_confirmation');
    }
}
