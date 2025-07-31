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
        Schema::create('transaction_lists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->foreignId('lot_id')->onDelete('cascade')->constrained('lots');
            $table->foreignId('allottee_id')->onDelete('cascade')->constrained('allottees');
            $table->foreignId('transaction_id')->onDelete('cascade')->constrained('transactions');
            $table->string('transaction_type')->nullable();
            $table->string('transaction_name');
            $table->string('transaction_posted_date');
            $table->string('transaction_amount')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_lists');
    }
};
