<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationErrorNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $errorMessage;

    public function __construct($errorMessage)
    {
        $this->errorMessage = $errorMessage;
    }

    public function build()
    {
        return $this->subject('Verification Error')
                    ->view('emails.instructors_emails.verification_error_notification')
                    ->with(['errorMessage' => $this->errorMessage]);
    }
}
