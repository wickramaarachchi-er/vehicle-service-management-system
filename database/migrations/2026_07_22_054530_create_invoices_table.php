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
    Schema::create('invoices', function (Blueprint $table) {
        $table->id();
        $table->foreignId('job_card_id')->constrained()->cascadeOnDelete();
        $table->string('invoice_number')->unique();
        $table->decimal('labor_total', 10, 2)->default(0);
        $table->decimal('parts_total', 10, 2)->default(0);
        $table->decimal('grand_total', 10, 2)->default(0);
        $table->string('payment_status')->default('Pending');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
