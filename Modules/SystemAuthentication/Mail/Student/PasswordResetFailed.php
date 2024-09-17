<?php

namespace Modules\SystemAuthentication\Mail\Student;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetFailed extends Mailable
{
    use Queueable, SerializesModels;

    public $studentId;
    public $reason;

    public function __construct($studentId, $reason)
    {
        $this->studentId = $studentId;
        $this->reason = $reason;
    }

    public function build()
    {
        return $this->subject('Password Reset Failed')
                    ->view('emails.students_emails.password_reset_failed');
    }
}
