<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class JobCard extends Model
{
    use HasFactory;

    protected $fillable = ['booking_id', 'mechanic_id', 'status', 'summary', 'labor_cost', 'started_at', 'completed_at'];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(Mechanic::class);
    }

    public function parts(): BelongsToMany
    {
        return $this->belongsToMany(Part::class, 'job_card_part')
            ->withPivot('quantity_used', 'unit_price_at_time')
            ->withTimestamps();
    }

    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }
}