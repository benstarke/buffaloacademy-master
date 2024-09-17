<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option defines the default authentication "guard" and password
    | reset "broker" for your application. You may change these values
    | as required, but they're a perfect start for most applications.
    |
    */

    // 'defaults' => [
    //     'guard' => env('AUTH_GUARD', 'web'),
    //     'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    // ],

    // 'defaults' => [
    //     'guard' => env('AUTH_GUARD', 'api'), // Changed to 'api'
    //     'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    // ],

    'default' => [
        'guard' => 'api',
        'passwords' => 'students',
    ],


    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | which utilizes session storage plus the Eloquent user provider.
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | Supported: "session"
    |
    */

    'guards' => [
        // Web view Aunthentication
        // 'web' => [
        //     'driver' => 'session',
        //     'provider' => 'users',
        // ],

        // •	Token-Based Authentication:

        // Ideal for simpler applications 
        // Typically used in traditional web applications with session management.

        
        // 'api' => [
        //     'driver' => 'token',
        //     'provider' => 'users',
        //     'hash' => false,
        // ],

        // •	JWT Authentication:
        // o	Suitable for modern, scalable applications, especially single-page applications (SPAs) and microservices architectures.
        'api' => [
            'driver' => 'jwt',
            'provider' => 'students', // Guard for students
        ],
        'instructor' => [
            'driver' => 'jwt',
            'provider' => 'instructors', // Guard for instructors
        ],
    ],

    

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | If you have multiple user tables or models you may configure multiple
    | providers to represent the model / table. These providers may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        // Web view
        // 'users' => [
        //     'driver' => 'eloquent',
        //     'model' => env('AUTH_MODEL', App\Models\User::class),
        // ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],

        // JWT Aunthentication
        'students' => [
        'driver' => 'database',
        'table' => 'par_students', // Specify the students table
        ],

        'instructors' => [
            'driver' => 'database',
            'table' => 'par_instructors', // Specify the instructors table
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | These configuration options specify the behavior of Laravel's password
    | reset functionality, including the table utilized for token storage
    | and the user provider that is invoked to actually retrieve users.
    |
    | The expiry time is the number of minutes that each reset token will be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    | The throttle setting is the number of seconds a user must wait before
    | generating more password reset tokens. This prevents the user from
    | quickly generating a very large amount of password reset tokens.
    |
    */

    // 'passwords' => [
    //     'users' => [
    //         'provider' => 'users',
    //         'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
    //         'expire' => 60,
    //         'throttle' => 60,
    //     ],
    // ],

    'passwords' => [
        'students' => [
            'provider' => 'students',
            'table' => 'par_password_resets',
            'expire' => 60,
        ],
        'instructors' => [
        'provider' => 'instructors',
        'table' => 'par_password_resets',
        'expire' => 60,
    ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the amount of seconds before a password confirmation
    | window expires and users are asked to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
