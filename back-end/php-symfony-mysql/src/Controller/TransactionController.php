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

    #[Route('/transaction', name: 'add_transaction', methods: ['POST'])]
    public function createTransaction(Request $request)
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $customerId = (int) $data['customerId'];
        $amount = (float) $data['amount'];

        $result = $this->transactionService->create($customerId, $amount);
        return $this->createResponse($result);
    }

    #[Route('/transaction/{customerId}/{transactionId}', name: 'get_transaction', methods: ['GET'])]
    public function getTransaction(int $customerId, int $transactionId)
    {
        $result = $this->transactionService->get($customerId, $transactionId);
        return $this->createResponse($result);
    }

    #[Route('/transaction', name: 'update_transaction', methods: ['PATCH'])]
    public function updateTransaction(Request $request)
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $customerId = (int) $data['customerId'];
        $transactionId = (int) $data['transactionId'];
        $amount = (float) $data['amount'];

        $result = $this->transactionService->update($customerId, $transactionId, $amount);
        return $this->createResponse($result);
    }

    #[Route('/transaction/{customerId}/{transactionId}', name: 'delete_transaction', methods: ['DELETE'])]
    public function deleteTransaction(int $customerId, int $transactionId)
    {
        $result = $this->transactionService->delete($customerId, $transactionId);
        return $this->createResponse($result);
    }

    #[Route('/transaction', name: 'get_transaction_by_filter', methods: ['GET'])]
    public function getTransactionByFilter(Request $request)
    {
        $search = ['customer' => $request->query->get('customerId')];
        
        if ($amount = $request->query->get('amount')) {
            $search['amount'] = $amount;
        }
        
        if ($date = $request->query->get('date')) {
            $search['date'] = \DateTime::createFromFormat('Y-m-d', $date);
        }

        $result = $this->transactionService->getByFilter($search);
        return $this->createResponse($result);
    }     
}
