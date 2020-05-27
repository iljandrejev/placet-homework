<?php
namespace App\Mappers;

use App\Entity\Customer;
use App\Requests\CustomerRequest;
use App\Responses\CustomerResponse;

class CustomerMapper
{

    public static function toCustomerEntity(CustomerRequest $request) : Customer
    {
        return (new Customer())
            ->setFirstname($request->getFirstname())
            ->setLastname($request->getLastname())
            ->setEducation($request->getEducation())
            ->setEmail($request->getEmail())
            ->setProccessInformation($request->isAgreement());
    }

    public static function toCustomerResponse(Customer $customer) : CustomerResponse
    {
        return (new CustomerResponse())
            ->setId($customer->getId())
            ->setFirstname($customer->getFirstname())
            ->setLastname($customer->getLastname())
            ->setEmail($customer->getEmail())
            ->setEducation($customer->getEducation())
            ->setAgreement($customer->getProccessInformation())
            ->setScore($customer->getScore());
    }


    public static function toCustomerResponseList($customers) : array
    {
        $result = [];
        foreach ($customers as $customer) {
            $result[] = self::toCustomerResponse($customer);
        }
        return $result;
    }

}