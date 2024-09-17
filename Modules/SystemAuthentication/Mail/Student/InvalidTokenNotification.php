<?php

namespace Modules\SystemAuthentication\Mail\Student;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvalidTokenNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct()
    {
    }

    public function build()
    {
        return $this->subject('Invalid Verification Token')
                    ->view('emails.students_emails.invalid_token_notification');
    }
}
