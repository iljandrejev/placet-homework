<?php


namespace App\Services\Scoring\Rules;


use App\Entity\Customer;

class EducationRule implements RuleInterface
{

    public function getScore(Customer $customer): int
    {
        $educationLevel = $customer->getEducation();
        switch ($educationLevel) {
            case Customer::EDUCATION_HIGH:
                return 15;
            case Customer::EDUCATION_PROF:
                return 10;
            case Customer::EDUCATION_MIDDLE:
                return 5;
            default:
                return 0;
        }
    }
}