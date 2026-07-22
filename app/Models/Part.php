<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'part_number', 'stock_quantity', 'low_stock_threshold', 'unit_price'];
    public function jobCards(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(JobCard::class, 'job_card_part')
        ->withPivot('quantity_used', 'unit_price_at_time')
        ->withTimestamps();
    }
}