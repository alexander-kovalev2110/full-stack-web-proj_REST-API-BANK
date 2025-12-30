<?php

namespace App\Controller;

use App\Entity\Customer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\DTO\AmountTransactionRequest;
use App\DTO\FilterTransactionRequest;
use App\Service\TransactionService;
use App\Service\ValidatorService;

class TransactionController extends AbstractController
{
    public function __construct(
        private readonly TransactionService $transactionService,
        private readonly ValidatorService $validator,
        private readonly SerializerInterface $serializer
    ) {}

    #[Route('/transaction', name: 'add_transaction', methods: ['POST'])]
    public function createTransaction(Request $request, Customer $customer): JsonResponse
    {
        $dto = $this->serializer->deserialize(
            $request->getContent(), 
            AmountTransactionRequest::class, 
            'json'
        );

        $this->validator->validate($dto);

        return $this->json(
            $this->transactionService->createTransaction(
                $customer, 
                $dto->amount
            ), 
            Response::HTTP_CREATED
        );
    }

    #[Route('/transaction/{transactionId}', name: 'get_transaction', methods: ['GET'])]
    public function getTransaction(int $transactionId, Customer $customer): JsonResponse
    {
        return $this->json(
            $this->transactionService->getTransaction(
                $customer->getId(),
                $transactionId
            ), Response::HTTP_OK
        );
    }

    #[Route('/transaction/{transactionId}', name: 'update_transaction', methods: ['PATCH'])]
    public function updateTransaction(int $transactionId, Request $request, Customer $customer): JsonResponse
    {
        $dto = $this->serializer->deserialize(
            $request->getContent(), 
            AmountTransactionRequest::class, 
            'json'
        );

        $this->validator->validate($dto);

        return $this->json(
            $this->transactionService->changeAmount(
                $customer->getId(),
                $transactionId,
                $dto->amount
            ), Response::HTTP_OK
        );
    }

    #[Route('/transaction/{transactionId}', name: 'delete_transaction', methods: ['DELETE'])]
    public function deleteTransaction(int $transactionId, Customer $customer): JsonResponse
    {
        return $this->json(
            $this->transactionService->removeTransaction(
                $customer->getId(),
                $transactionId
            ), Response::HTTP_OK
        );
    }

    #[Route('/transactions', name: 'get_transaction_by_filter', methods: ['GET'])]
    public function getTransactionByFilter(Request $request, Customer $customer): JsonResponse
    {
        // Convert QUERY → DTO
        $dto = new FilterTransactionRequest(
            amount: $request->query->get('amount'),
            date: $request->query->get('date')
        );

        $this->validator->validate($dto);

        return $this->json(
            $this->transactionService->getTransactionByFilter(
                $customer->getId(),
                $dto
            ), Response::HTTP_OK
        );
    }
}
