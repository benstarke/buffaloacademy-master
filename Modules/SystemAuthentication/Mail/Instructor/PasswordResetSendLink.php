<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetSendLink extends Mailable
{
    use Queueable, SerializesModels;

    public $resetUrl;

    public function __construct($resetUrl)
    {
        $this->resetUrl = $resetUrl;
    }

    public function build()
    {
        return $this->subject('Password Reset Request')
                    ->with(['resetUrl' => $this->resetUrl])
                    ->view('emails.instructors_emails.password_reset_send_link');
    }
}
 