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

        if (!$customer) {
            return ['errMessage' => 'Customer is not available.'];
        }

        $transaction = new Transaction();

        $transaction->setAmount($amount);
        $transaction->setDate(new \DateTime("now"));
        $transaction->setCustomer($customer);

        // Saving $transaction to Transaction DB
        $this->entityManager->persist($transaction);
        $this->entityManager->flush();

        return [
            'transactions' => [
                [
                    'transactionId' => $transaction->getId(),
                    'amount' => $transaction->getAmount(),
                    'date' => $transaction->getDate()->format("Y-m-d"),
                    'customerId' => $transaction->getCustomer()->getId()
                ]
            ]
        ];
    }

    public function getServ(int $customerId, int $transactionId): array
    {
        // Getting transaction from Transaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['customer' => $customerId, 'id' => $transactionId]);

        if ($transaction) {
        return [
            'transactions' => [
                [
                    'transactionId' => $transaction->getId(),
                    'amount' => $transaction->getAmount(),
                    'date' => $transaction->getDate()->format("Y-m-d"),
                    'customerId' => $transaction->getCustomer()->getId()
                ]
            ]
        ];
        }
        else {
            return ['errMessage' => 'Transaction is not available.'];
        }
    }

    public function updateServ(int $customerId, int $transactionId, float $amount): array
    {
        // Getting transaction from Transaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['customer' => $customerId, 'id' => $transactionId]);

        if ($transaction) {
            $transaction->setAmount($amount);            // Updating transaction (amount)
            $this->entityManager->flush();               // Saving $transaction

        return [
            'transactions' => [
                [
                    'transactionId' => $transaction->getId(),
                    'amount' => $transaction->getAmount(),
                    'date' => $transaction->getDate()->format("Y-m-d"),
                    'customerId' => $transaction->getCustomer()->getId()
                ]
            ]
        ];
        } else {
            return ['errMessage' => 'Transaction is not available for updating.'];
        }
    }

    public function deleteServ(int $customerId, int $transactionId): array
    {
        // Getting transaction from Transaction DB
        $transaction = $this->entityManager->getRepository(Transaction::class)
            ->findOneBy(['customer' => $customerId, 'id' => $transactionId]);

        if ($transaction) {
            $this->entityManager->remove($transaction);       // Deleting transaction
            $this->entityManager->flush();                    // Saving deleting

            return ['transactions' => []];
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

            $transForResponse = [];
            foreach($transactions as $i => $tran) {
                $transForResponse[$i] = [
                    'transactionId' => $tran->getId(),
                    'amount' => $tran->getAmount(),
                    'date' => $tran->getDate()->format("Y-m-d"),
                    'customerId' => $tran->getCustomer()->getId()
                ];

            };
            return ['transactions' => $transForResponse];
    }
}