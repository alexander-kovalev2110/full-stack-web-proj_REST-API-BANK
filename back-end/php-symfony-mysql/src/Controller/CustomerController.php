<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\CustomerService;

class CustomerController extends AbstractController
{
    public function __construct(
        private readonly CustomerService $customerService
        ) {}

    #[Route('/customer/{name}/{pw}', name: 'create_customer', methods: ['POST'])]
    public function createCustomer(string $name, string $pw): JsonResponse
    {
        $result =  $this->customerService->createServ($name, $pw);
        $status = isset($result['customerId']) ? Response::HTTP_OK : Response::HTTP_BAD_REQUEST;
        
        return new JsonResponse($result, $status);
    }

    #[Route('/customer/{name}/{pw}', name: 'login_customer', methods: ['GET'])]
    public function loginCustomer(string $name, string $pw): JsonResponse
    {
        $result = $this->customerService->loginServ($name, $pw);
        $status = isset($result['customerId']) ? Response::HTTP_OK : Response::HTTP_BAD_REQUEST;
        
        return new JsonResponse($result, $status);
    }
}
