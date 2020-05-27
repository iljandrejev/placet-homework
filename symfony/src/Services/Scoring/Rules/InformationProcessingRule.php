<?php

namespace App\Services\Scoring\Rules;


use App\Entity\Customer;

class InformationProcessingRule implements RuleInterface
{

    public function getScore(Customer $customer): int
    {
        $allowedToProcess = $customer->getProccessInformation();
        if($allowedToProcess) {
            return 4;
        } else {
            return 0;
        }
    }
}