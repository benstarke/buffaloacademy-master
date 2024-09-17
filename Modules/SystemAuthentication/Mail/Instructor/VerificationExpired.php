<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationExpired extends Mailable
{
    use Queueable, SerializesModels;

    public $resendUrl;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($resendUrl)
    {
        $this->resendUrl = $resendUrl;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.instructors_emails.verification_expired')
                    ->subject('Your Email Verification Link has Expired')
                    ->with(['resendUrl' => $this->resendUrl]);
    }
}
