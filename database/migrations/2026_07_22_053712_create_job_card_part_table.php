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
    Schema::create('job_card_part', function (Blueprint $table) {
        $table->id();
        $table->foreignId('job_card_id')->constrained()->cascadeOnDelete();
        $table->foreignId('part_id')->constrained()->cascadeOnDelete();
        $table->integer('quantity_used')->default(1);
        $table->decimal('unit_price_at_time', 10, 2);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_card_part');
    }
};
