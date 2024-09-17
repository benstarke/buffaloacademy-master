<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('api_misaudit_trail', function (Blueprint $table) {
            $table->id();
            $table->string('table_name');
            $table->string('table_action');
            $table->integer('record_id')->nullable();
            $table->longText('prev_tabledata')->nullable();
            $table->longText('current_tabledata')->nullable();
            $table->string('ip_address')->nullable();
           // for store method
            $table->string('created_by', 50)->nullable();
            $table->string('created_on', 50)->nullable();

            // defualt timestamps
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('api_misaudit_trail');
        
    }

};

