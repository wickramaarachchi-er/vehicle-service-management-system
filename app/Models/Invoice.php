<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['job_card_id', 'invoice_number', 'labor_total', 'parts_total', 'grand_total', 'payment_status'];

    public function jobCard(): BelongsTo
    {
        return $this->belongsTo(JobCard::class);
    }
}