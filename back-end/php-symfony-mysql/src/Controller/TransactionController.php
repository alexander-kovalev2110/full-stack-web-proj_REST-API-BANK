<?php

namespace App\Controller;

use App\DTO\TransactionResponse;
use App\DTO\TransactionListResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
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

    private function getCustomerId(): int
    {
        /** @var \App\Entity\Customer $user */
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('User not authenticated.');
        }
        return $user->getId();
    }

    private function createResponse(TransactionListResponse $response): JsonResponse
    {
        return $this->json($response, Response::HTTP_OK);
    }

    #[Route('/transaction', name: 'add_transaction', methods: ['POST'])]
    public function createTransaction(Request $request): JsonResponse
    {
        $dto = $this->serializer->deserialize(
            $request->getContent(), 
            AmountTransactionRequest::class, 
            'json'
        );

        $this->validator->validate($dto);

        $response = $this->transactionService->create(
            $this->getCustomerId(),
            $dto->amount
        );

        return $this->createResponse($response);
    }

    #[Route('/transaction/{transactionId}', name: 'get_transaction', methods: ['GET'])]
    public function getTransaction(int $transactionId): JsonResponse
    {
        $response = $this->transactionService->get(
            $this->getCustomerId(), 
            $transactionId
        );

        return $this->createResponse($response);
    }

    #[Route('/transaction/{transactionId}', name: 'update_transaction', methods: ['PATCH'])]
    public function updateTransaction(int $transactionId, Request $request): JsonResponse
    {
        $dto = $this->serializer->deserialize(
            $request->getContent(), 
            AmountTransactionRequest::class, 
            'json'
        );

        $this->validator->validate($dto);

        $response = $this->transactionService->update(
            $this->getCustomerId(),
            $transactionId, 
            $dto->amount);
            
        return $this->createResponse($response);
    }

    #[Route('/transaction/{transactionId}', name: 'delete_transaction', methods: ['DELETE'])]
    public function deleteTransaction(int $transactionId): JsonResponse
    {
        $response = $this->transactionService->delete($this->getCustomerId(), $transactionId);
        return $this->createResponse($response);
    }

    #[Route('/transaction', name: 'get_transaction_by_filter', methods: ['GET'])]
    public function getTransactionByFilter(Request $request): JsonResponse
    {
        // Convert QUERY → DTO
        $dto = new FilterTransactionRequest(
            amount: $request->query->get('amount'),
            date: $request->query->get('date')
        );

        $this->validator->validate($dto);

        $response = $this->transactionService->getByFilter($this->getCustomerId(), $dto);

        return $this->createResponse($response);
    }
}
