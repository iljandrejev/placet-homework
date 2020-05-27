<?php

namespace App\Services\Scoring\Rules;


use App\Entity\Customer;

interface RuleInterface
{
    public function getScore(Customer $customer) : int ;
}