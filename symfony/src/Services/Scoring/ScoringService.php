<?php

namespace App\Services\Scoring;


use App\Entity\Customer;
use App\Repository\CustomerRepository;
use App\Services\Customer\CustomerService;
use Doctrine\ORM\EntityManagerInterface;

class ScoringService
{

    private $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    /**
     * @param $customerId
     * @return Customer
     * @throws \CustomerNotFoundException
     */
    public function singularRefreshScore($customerId) : Customer
    {
        $customer = $this->customerService->findCustomer($customerId);
        $customer->setScore(ScoreCalculator::calculate($customer));
        return $this->customerService->update($customer);
    }

    public function multiRefreshScore() {
        $customers = $this->customerService->findAll();
        /** @var Customer $customer */
        foreach ($customers as $customer) {
            $customer->setScore(ScoreCalculator::calculate($customer));
            $this->customerService->update($customer);
        }
    }
}