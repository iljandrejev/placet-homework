<?php

namespace App\Services\Scoring;


use App\Entity\Customer;
use App\Services\Scoring\Rules\EducationRule;
use App\Services\Scoring\Rules\EmailRule;
use App\Services\Scoring\Rules\InformationProcessingRule;
use App\Services\Scoring\Rules\RuleInterface;

class ScoreCalculator
{

    public static function calculate(Customer $customer)
    {
        $total = 0;
        /** @var RuleInterface $rule */
        foreach (self::rulesList() as $rule) {
            $total += $rule->getScore($customer);
        }
        return $total;
    }


    private static function rulesList() : array
    {
        return [
            new EmailRule(),
            new EducationRule(),
            new InformationProcessingRule()
        ];
    }
}