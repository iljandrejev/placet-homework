<?php
namespace App\Services\Customer;

use App\Entity\Customer;
use App\Mappers\CustomerMapper;
use App\Repository\CustomerRepository;
use App\Requests\CustomerRequest;
use App\Services\Customer\Exceptions\CustomerNotFoundException;
use App\Services\Scoring\ScoreCalculator;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;

class CustomerService
{
    private $customerRepository;
    private $entityManager;
    private $paginator;

    public function __construct(
        EntityManagerInterface $entityManager,
        CustomerRepository $customerRepository,
        PaginatorInterface $pagination
    )
    {
        $this->entityManager = $entityManager;
        $this->customerRepository = $customerRepository;
        $this->paginator = $pagination;

    }

    /**
     * @param $customerId
     * @return Customer|null
     * @throws CustomerNotFoundException
     */
    public function findCustomer($customerId) {
        $customer = $this->customerRepository->find($customerId);
        if(empty($customer)){
            throw new CustomerNotFoundException("Customer with $customerId not found");
        }
        return $customer;
    }

    public function createCustomer(CustomerRequest $newCustomer) : Customer {
        $customer = CustomerMapper::toCustomerEntity($newCustomer);
        $customer->setScore(ScoreCalculator::calculate($customer));
        $this->entityManager->persist($customer);
        $this->entityManager->flush();
        return $customer;
    }

    /**
     * @param $customerId
     * @param CustomerRequest $customerRequest
     * @return Customer
     * @throws CustomerNotFoundException
     */
    public function updateCustomer($customerId, CustomerRequest $customerRequest)
    {
        $customer = $this->findCustomer($customerId);
        $customer
            ->setFirstname($customerRequest->getFirstname())
            ->setLastname($customerRequest->getLastname())
            ->setEducation($customerRequest->getEducation())
            ->setEmail($customerRequest->getEmail())
            ->setProccessInformation($customerRequest->isAgreement());
        $customer->setScore(ScoreCalculator::calculate($customer));
        return $this->update($customer);


    }

    public function getAll($pageNr, $limit = 20)
    {
        $queryBuilder = $this->entityManager->createQueryBuilder();
        $queryBuilder->select('c')->from(Customer::class, 'c');
        $pagination = $this->paginator->paginate(
            $queryBuilder,
            $pageNr,
            $limit
        );
        $pagination->setCustomParameters([
            'total-pages' => ceil($pagination->getTotalItemCount() / $limit),
            'limit' => $limit
        ]);

        return $pagination;
    }

    public function findAll()
    {
        return $this->customerRepository->findAll();
    }

    public function update(Customer $customer) : Customer
    {
        $this->entityManager->flush($customer);
        return $customer;
    }

}