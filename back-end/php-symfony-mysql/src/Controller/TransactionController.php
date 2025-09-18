<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\TransactionService;

class TransactionController extends AbstractController
{
    public function __construct(
        private readonly TransactionService $transactionService
    ) {}

     private function createResponse(array $result): JsonResponse
    {
        $status = isset($result['errMessage']) ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK;
        return new JsonResponse($result, $status);
    }

    #[Route('/transaction/{customerId}/{amount}', name: 'add_transaction', methods: ['POST'])]
    public function createTransaction(int $customerId, float $amount): JsonResponse
    {
        $result = $this->transactionService->createServ($customerId, $amount);
        return $this->createResponse($result);
    }

    #[Route('/transaction/{customerId}/{transactionId}', name: 'get_transaction', methods: ['GET'])]
    public function getTransaction(int $customerId, int $transactionId): JsonResponse
    {
        $result = $this->transactionService->getServ($transactionId);
        return $this->createResponse($result);
    }

    #[Route('/transaction/{customerId}/{transactionId}/{amount}', name: 'update_transaction', methods: ['PATCH'])]
    public function updateTransaction(int $customerId, int $transactionId, float $amount): JsonResponse
    {
        $result = $this->transactionService->updateServ($transactionId, $amount);
        return $this->createResponse($result);
    }

    #[Route('/transaction/{customerId}/{transactionId}', name: 'delete_transaction', methods: ['DELETE'])]
    public function deleteTransaction(int $customerId, int $transactionId): JsonResponse
    {
        $result = $this->transactionService->deleteServ($transactionId);
        return $this->createResponse($result);
    }

    #[Route('/transaction/{customerId}', name: 'get_transaction_by_filter', methods: ['GET'])]
    public function getTransactionByFilter(int $customerId, Request $request): JsonResponse
    {
        $search = ['customer' => $customerId];
        
        if ($amount = $request->query->get('amount')) {
            $search['amount'] = $amount;
        }
        
        if ($date = $request->query->get('date')) {
            $search['date'] = \DateTime::createFromFormat('Y-m-d', $date);
        }

        $result = $this->transactionService->getByFilterServ($search);
        $status = isset($result['transactions']) ? Response::HTTP_OK : Response::HTTP_BAD_REQUEST;

        return new JsonResponse($result, $status);
    }     
}
