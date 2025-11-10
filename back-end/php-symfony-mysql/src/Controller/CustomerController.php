<?php

namespace App\Controller;

use App\DTO\CustomerRequest;
use App\Service\CustomerService;
use App\Service\ValidatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{
    public function __construct(
        private readonly CustomerService $customerService,
        private readonly ValidatorService $validatorService,
    ) {}

    #[Route('/customer/register', name: 'create_customer', methods: ['POST'])]
    public function createCustomer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $dto = new CustomerRequest();
        $dto->name = $data['name'] ?? null;
        $dto->password = $data['password'] ?? null;

        $this->validatorService->validate($dto);

        $token = $this->customerService->create($dto->name, $dto->password);

        return $this->json(
            ['token' => $token],
            Response::HTTP_CREATED
        );
    }

    #[Route('/customer/login', name: 'login_customer', methods: ['POST'])]
    public function loginCustomer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $dto = new CustomerRequest();
        $dto->name = $data['name'] ?? null;
        $dto->password = $data['password'] ?? null;

        $this->validatorService->validate($dto);

        $token = $this->customerService->login($dto->name, $dto->password);

        return $this->json(
            ['token' => $token],
            Response::HTTP_OK
        );
    }
}
