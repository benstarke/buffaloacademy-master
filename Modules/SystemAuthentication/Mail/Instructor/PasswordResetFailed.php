<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetFailed extends Mailable
{
    use Queueable, SerializesModels;

    public $instructorId;
    public $reason;

    public function __construct($instructorId, $reason)
    {
        $this->instructorId = $instructorId;
        $this->reason = $reason;
    }

    public function build()
    {
        return $this->subject('Password Reset Failed')
                    ->view('emails.instructors_emails.password_reset_failed');
    }
}
