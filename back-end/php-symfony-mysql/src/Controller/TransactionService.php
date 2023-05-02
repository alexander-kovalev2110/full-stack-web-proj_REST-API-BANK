<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Entity\Transaction;
use Doctrine\ORM\EntityManagerInterface;

class TransactionService {

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createServ(int $customerId, float $amount): array
    {
        $customer = $this->entityManager->getRepository(Customer::class)
            ->findOneBy(['id' => $customerId]);

        $transaction = new Transaction();

        $transaction->setAmount($amount);
        $transaction->setDate(new \DateTime("now"));
        $transaction->setCustomer($customer);

        // Saving $transaction to Transaction DB
        $this->entityManager->persist($transaction);
        $this->entityManager->flush();

        if ($transaction->getId()) {
            return ['transactionId' => $transaction->getId(),
                'amount' => $transaction->getAmount(),
                'date' => $transaction->getDate()->format("Y-m-d")];
        }
        else {
            return ['errMessage' => 'Transaction is not available.'];
        }
    }

    public function getServ(int $transactionId): array
    {
        // Getting transaction from Transaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['id' => $transactionId]);

        if ($transaction) {
            return ['transactionId' => $transaction->getId(),
                'amount' => $transaction->getAmount(),
                'date' => $transaction->getDate()->format("Y-m-d")];
        }
        else {
            return ['errMessage' => 'Transaction is not available.'];
        }
    }

    public function updateServ(int $transactionId, float $amount): array
    {
        // Getting transaction from Transaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['id' => $transactionId]);

        if ($transaction) {
            $transaction->setAmount($amount);            // Updating transaction (amount)
            $this->entityManager->flush();               // Saving $transaction

            return ['transactionId' => $transaction->getId(),
                'amount' => $transaction->getAmount(),
                'date' => $transaction->getDate()->format("Y-m-d")];
        } else {
            return ['errMessage' => 'Transaction is not available for updating.'];
        }
    }

    public function deleteServ(int $transactionId): array
    {
        // Getting transaction from Transaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['id' => $transactionId]);

        if ($transaction) {
            $this->entityManager->remove($transaction);       // Deleting transaction
            $this->entityManager->flush();                    // Saving deleting

            return ['transactions' => [],
                'message' => 'success'];
        }
        else {
            return ['errMessage' => 'Transaction is not available for deleting.'];
        }
    }

//    public function getByFilterServ(int $customerId): array
    public function getByFilterServ(array $search): array
    {
        // Getting transactions from Transaction DB for response
        $transactions = $this->entityManager->getRepository(Transaction::class)->findBy($search);

        if ($transactions) {
            $transForResponse = [];
            foreach($transactions as $i => $tran) {
                $transForResponse[$i] = [
                    'transactionId' => $tran->getId(),
                    'amount' => $tran->getAmount(),
                    'date' => $tran->getDate()->format("Y-m-d")
                ];

            };
            return ['transactions' => $transForResponse];
        }
        else {
            return ['errMessage' => 'Transactions are not available.'];
        }
    }
}