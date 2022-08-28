<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Transaction;
use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;

class TransactionController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // Adding a transaction
    #[Route('/transaction/{customerId}/{amount}', name: 'app_transaction', methods: ['POST'])]
    public function addTransaction(int $customerId, float $amount): Response
    {
        $customer = $this->entityManager->getRepository(Customer::class)
        ->findOneBy(['id' => $customerId]);

        $today = new \DateTime("now");

        $transaction = new Transaction();
        $transaction->setAmount($amount);
        $transaction->setDate($today);
        $transaction->setCustomer($customer); 

        // Saving $transaction to Transaction DB
        $this->entityManager->persist($transaction);
        $this->entityManager->flush();

        // Getting trasaction from Trasaction DB for response
        $transaction = $this->entityManager->getRepository(Transaction::class)
                ->findOneBy(['amount' => $amount, 'date' => $today, 'customer' => $customer]);
      
        if ($transaction) {
            $transResponse = [
                'transactionId' => $transaction->getId(),
                'amount' => $transaction->getAmount(),
                'date' => $transaction->getDate()->format("Y-m-d")
            ];

            return new JsonResponse([
                'transactions' => [$transResponse],
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Transaction is not available.' 
            ], 400); 
        }
    }

    // Getting the transaction
    #[Route('/transaction/{customerId}/{transactionId}', name: 'get_transaction', methods: ['GET'])]
    public function getTransaction(int $customerId, int $transactionId): Response
    {
        // Getting trasaction from Trasaction DB for response
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['customer' => $customerId, 'id' => $transactionId]);

        if ($transaction) {
            $transResponse = [
                'transactionId' => $transaction->getId(),
                'amount' => $transaction->getAmount(),
                'date' => $transaction->getDate()->format("Y-m-d")
            ];

            return new JsonResponse([
                'transactions' => [$transResponse],
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Transaction is not available.' 
            ], 400);
        }
    }

    // Updating a transaction
    #[Route('/transaction/{customerId}/{transactionId}/{amount}', name: 'update_transaction', methods: ['PATCH'])]
    public function updateTransaction(int $customerId, int $transactionId, float $amount): Response
    {
        $search = ['customer' => $customerId, 'id' => $transactionId];      // Array with search fields

        // Getting trasaction from Trasaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy($search);
        
        if ($transaction) {
            $transaction->setAmount($amount);            // Updating trasaction (amount)
            $this->entityManager->flush();               // Saving $transaction
        }

         // Getting trasaction from Trasaction DB for response
         $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy($search);

        if ($transaction) {
            $transResponse = [
                'transactionId' => $transaction->getId(),
                'amount' => $transaction->getAmount(),
                'date' => $transaction->getDate()->format("Y-m-d")
            ];

            return new JsonResponse([
                'transactions' => [$transResponse],
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Transaction is not available.' 
            ], 400); 
        }
    }

    // Deleting the transaction
    #[Route('/transaction/{customerId}/{transactionId}', name: 'delete_transaction', methods: ['DELETE'])]
    public function deleteTransaction(int $customerId, int $transactionId): Response
    {
        // Getting trasaction from Trasaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['customer' => $customerId, 'id' => $transactionId]);

        if ($transaction) {
            $this->entityManager->remove($transaction);       // Deleting trasaction
            $this->entityManager->flush();                    // Saving deleting

            return new JsonResponse([
                'transactions' => [],
                'message' => 'success'
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Transaction is not available for deleting.' 
            ], 400); 
        }
    }

    // Getting the transaction by filter
    #[Route('/transaction/{customerId}', name: 'get_transaction_by_filter', methods: ['GET'])]
    public function getTransactionByFilter(Request $request, int $customerId): Response
    {
        $amount = $request->query->get('amount');
        $date = $request->query->get('date');

        // Getting trasaction from Trasaction DB for response
        $search['customer'] = $customerId;                  // Array with search fields
        if ($amount) $search['amount'] = $amount;
        if ($date) $search['date'] = \DateTime::createFromFormat('Y-m-d', $date);

        $transactions = $this->entityManager->getRepository(Transaction::class)->findBy($search);

        if ($transactions) {
            $transResponse = [];
            foreach($transactions as $i => $tran) {
                $transResponse[$i] = [
                    'transactionId' => $tran->getId(),
                    'amount' => $tran->getAmount(),
                    'date' => $tran->getDate()->format("Y-m-d")
                ];
            };
           return new JsonResponse([
                'transactions' => $transResponse,
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Transactions are not available.' 
            ], 400);
        }
    }
}
