<?php

namespace App\Factory;


use App\Entity\Customer;
use App\Services\Scoring\ScoreCalculator;

class CustomerFactory
{

    public static function createCustomer($firstname, $lastname, $email, $education, $agreement, $withScore = true) : Customer
    {
        $customer = new Customer();
        $customer
            ->setFirstname($firstname)
            ->setLastname($lastname)
            ->setEmail($email)
            ->setEducation($education)
            ->setProccessInformation($agreement);
        if($withScore){
            $customer->setScore(ScoreCalculator::calculate($customer));
        }
        return $customer;

    }
}