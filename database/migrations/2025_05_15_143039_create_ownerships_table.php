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
        Schema::create('ownerships', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->foreignId('lot_id')->onDelete('cascade')->constrained('lots');
            $table->foreignId('allottee_id')->onDelete('cascade')->constrained('allottees');
            $table->string('ownership_type')->nullable(); //allottee, administrator
            $table->string('ownership_start_date')->nullable(); //when set
            $table->string('ownership_end_date')->nullable(); //probably not needed laa
            $table->string('ownership_remarks')->nullable(); //saja
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ownerships');
    }
};
