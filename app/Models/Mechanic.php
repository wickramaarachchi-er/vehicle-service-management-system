<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mechanic extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'employee_id', 'specialization', 'contact'];
    public function jobCards(): \Illuminate\Database\Eloquent\Relations\HasMany
{
    return $this->hasMany(JobCard::class);
}
}