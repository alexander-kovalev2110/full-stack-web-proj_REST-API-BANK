<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class TransactionController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // Creating a transaction
    #[Route('/transaction/{customerId}/{amount}', name: 'add_transaction', methods: ['POST'])]
    public function createTransaction(int $customerId, float $amount): Response
    {
        $service = new TransactionService($this->entityManager);
        $result = $service->createServ($customerId, $amount);

        $cod = isset($result['errMessage']) ? 400 : 200;
        return new JsonResponse($result, $cod);
    }

    // Getting the transaction
    #[Route('/transaction/{transactionId}', name: 'get_transaction', methods: ['GET'])]
    public function getTransaction(int $transactionId): Response
    {
        $service = new TransactionService($this->entityManager);
        $result = $service->getServ($transactionId);

        $cod = isset($result['errMessage']) ? 400 : 200;
        return new JsonResponse($result, $cod);
    }

    // Updating a transaction
    #[Route('/transaction/{transactionId}/{amount}', name: 'update_transaction', methods: ['PATCH'])]
    public function updateTransaction(int $transactionId, float $amount): Response
    {
        $service = new TransactionService($this->entityManager);
        $result = $service->updateServ($transactionId, $amount);

        $cod = isset($result['errMessage']) ? 400 : 200;
        return new JsonResponse($result, $cod);
    }

    // Deleting the transaction
    #[Route('/transaction/{transactionId}', name: 'delete_transaction', methods: ['DELETE'])]
    public function deleteTransaction(int $transactionId): Response
    {
        $service = new TransactionService($this->entityManager);
        $result = $service->deleteServ($transactionId);

        $cod = isset($result['errMessage']) ? 400 : 200;
        return new JsonResponse($result, $cod);
    }

    // Getting the transaction by filter
    #[Route('/transaction/', name: 'get_transaction_by_filter', methods: ['GET'])]
    public function getTransactionByFilter(Request $request): Response
    {
        $customerId = $request->query->get('customerId');
        $amount = $request->query->get('amount');
        $date = $request->query->get('date');

        $search = [];
        if ($customerId) $search['customer'] = $customerId;
        if ($amount) $search['amount'] = $amount;
        if ($date) $search['date'] = \DateTime::createFromFormat('Y-m-d', $date);

        $service = new TransactionService($this->entityManager);
        $result = $service->getByFilterServ($search);

        $cod = isset($result['transactions']) ? 200 : 400;
        return new JsonResponse($result, $cod);
    }
}
