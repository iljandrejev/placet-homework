<?php


namespace App\Tests;


use App\Entity\Customer;
use App\Factory\CustomerFactory;
use App\Services\Scoring\ScoreCalculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{

    public function testScoreCalculator()
    {
        $customer = CustomerFactory::createCustomer(
            "Errol",
            "Sandavol",
            "errol.sandavol@gmail.com",
            Customer::EDUCATION_HIGH,
            true,
            false
        );

        $score = ScoreCalculator::calculate($customer);
        $this->assertEquals(29, $score, "Wrong score calculation");
    }

    public function testScoreCalculator2()
    {
        $customer = CustomerFactory::createCustomer(
            "Errol",
            "Sandavol",
            "errol.sandavol@yandex.ru",
            Customer::EDUCATION_MIDDLE,
            true,
            false
        );

        $score = ScoreCalculator::calculate($customer);
        $this->assertEquals(17, $score, "Wrong score calculation");
    }

    public function testScoreCalculator3()
    {
        $customer = CustomerFactory::createCustomer(
            "Errol",
            "Sandavol",
            "errol.sandavol@mail.ru",
            Customer::EDUCATION_PROF,
            false,
            false
        );

        $score = ScoreCalculator::calculate($customer);
        $this->assertEquals(16, $score, "Wrong score calculation");
    }


}