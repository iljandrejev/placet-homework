<?php

namespace App\Controller;

use App\Helpers\ValidationHelper;
use App\Mappers\CustomerMapper;
use App\Requests\CustomerRequest;
use App\Services\Customer\CustomerService;
use App\Services\Customer\Exceptions\CustomerNotFoundException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class CustomerController extends AbstractController
{
    private $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    /**
     * @Route("/api/customer", name="create_customer", methods={"POST"})
     * @ParamConverter("customer", class="App\Requests\CustomerRequest")
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request) : JsonResponse
    {
        if (ValidationHelper::hasViolations($request)){
            return ValidationHelper::parseErrors($request);
        }
        $dto = $request->attributes->get(CustomerRequest::class);
        $customer = $this->customerService->createCustomer($dto);
        return new JsonResponse(['result' => true, 'data' => CustomerMapper::toCustomerResponse($customer)]);

    }

    /**
     * @Route("/api/customer/{id}", name="update_customer", methods={"PUT"})
     * @ParamConverter("customer", class="App\Requests\CustomerRequest")
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request, $id) : JsonResponse
    {
        if (ValidationHelper::hasViolations($request)){
            return ValidationHelper::parseErrors($request);
        }
        $dto = $request->attributes->get(CustomerRequest::class);
        try {
            $customer = $this->customerService->updateCustomer($id, $dto);
            return new JsonResponse(['result'=> true, 'data' => CustomerMapper::toCustomerResponse($customer)]);
        } catch (CustomerNotFoundException $e) {
            return new JsonResponse(['result'=> false, "error" => $e->getMessage()], 400);
        }
    }

    /**
     * @Route("/api/customers", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function customersList(Request $request) : JsonResponse
    {
        $page = (int)$request->query->get('page');
        if(empty($page)) {
            $page = 1;
        }
        $limit = (int)$request->query->get('limit');
        if(empty($limit)) {
            $limit = 15;
        }
        $result = $this->customerService->getAll($page, $limit);

        return new JsonResponse([
            'result' => true,
            'data' => [
                'items' => CustomerMapper::toCustomerResponseList($result->getItems()),
                'pageNumber' => $result->getCurrentPageNumber(),
                'recordsOnPage' => $result->count(),
                'limit' => $result->getCustomParameter('limit'),
                'totalPages' => $result->getCustomParameter('total-pages'),
                'totalRecords' => $result->getTotalItemCount()
            ]
        ]);

    }


}
