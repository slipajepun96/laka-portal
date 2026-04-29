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
        Schema::create('allottees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->string('allottee_nric')->unique();
            $table->string('allottee_name');
            $table->string('allottee_address')->nullable();
            $table->string('allottee_phone_num')->nullable();
            $table->string('allottee_email')->nullable();
            $table->string('allottee_bank_name')->nullable();
            $table->string('allottee_bank_acc_num')->nullable();
            $table->string('allottee_is_dead')->nullable();
            $table->string('allottee_death_cert_num')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allottees');
    }
};
