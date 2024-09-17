<?php

namespace Modules\SystemAuthentication\Mail\Student;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TokenExpiredNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $resendUrl;

    public function __construct($resendUrl)
    {
        $this->resendUrl = $resendUrl;
    }

    public function build()
    {
        return $this->view('emails.students_emails.token_expired')
                    ->with(['resendUrl' => $this->resendUrl])
                    ->subject('Your Email Verification Token Has Expired');
    }
}
