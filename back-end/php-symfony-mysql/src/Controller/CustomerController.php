<?php

namespace App\Controller;

use App\Service\CustomerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{
    public function __construct(
        private readonly CustomerService $customerService
    ) {}

    #[Route('/customer/register', name: 'create_customer', methods: ['POST'])]
    public function createCustomer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $name = $data['name'] ?? null;
        $pw   = $data['password'] ?? null;

        if (!$name || !$pw) {
            return new JsonResponse(['errMessage' => 'Name and password are required'], Response::HTTP_BAD_REQUEST);
        }

        $result =  $this->customerService->create($name, $pw);
        $status = isset($result['customerId']) ? Response::HTTP_CREATED : Response::HTTP_CONFLICT;
        
        return new JsonResponse($result, $status);
    }

    #[Route('/customer/login', name: 'login_customer', methods: ['POST'])]
    public function loginCustomer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $name = $data['name'] ?? null;
        $pw   = $data['password'] ?? null;

        if (!$name || !$pw) {
            return new JsonResponse(['errMessage' => 'Name and password are required'], Response::HTTP_BAD_REQUEST);
        }

        $result = $this->customerService->login($name, $pw);
        $status = isset($result['errMessage']) ? Response::HTTP_UNAUTHORIZED : Response::HTTP_OK ;

        return new JsonResponse($result, $status);
    }
}
