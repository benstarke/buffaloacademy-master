<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IndisposableEmail implements Rule
{
    protected $disposableDomains = [
        'mailinator.com', '10minutemail.com', 'guerrillamail.com', // Add more disposable domains as needed
    ];

    public function passes($attribute, $value)
    {
        $domain = substr(strrchr($value, "@"), 1);
        return !in_array($domain, $this->disposableDomains);
    }

    public function message()
    {
        return 'The :attribute must not be from a disposable email provider.';
    }
}
