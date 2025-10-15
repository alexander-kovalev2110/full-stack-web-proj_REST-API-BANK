<?php

namespace App\Service;

use App\Entity\Transaction;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CustomerRepository;
use App\Repository\TransactionRepository;

class TransactionService 
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly CustomerRepository $customerRepo,
        private readonly TransactionRepository $transactionRepo
    ){}

    private function formatTransaction(Transaction $transaction): array
    {
        return [
            'transactionId' => $transaction->getId(),
            'amount' => $transaction->getAmount(),
            'date' => $transaction->getDate()->format("Y-m-d"),
            'customerId' => $transaction->getCustomer()->getId()
        ];
    }

    public function create(int $customerId, float $amount): array
    {
        if ($customerId <= 0 || $amount < 0) {
            return ['errMessage' => 'Invalid customerId or amount'];
        }

        $customer = $this->customerRepo->find($customerId);

        if (!$customer) {
            return ['errMessage' => 'Customer not found.'];
        }

        $transaction = (new Transaction())
            ->setCustomer($customer)
            ->setAmount($amount)
            ->setDate(new \DateTime());

        $this->em->persist($transaction);
        $this->em->flush();

        return [
            'transactions' => [$this->formatTransaction($transaction)]
        ];
    }

    public function get(int $customerId, int $transactionId,): array
    {
        $transactions = $this->transactionRepo->findBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transactions) {
            return ['errMessage' => 'Transaction not found.'];
        }

        return [
            'transactions' => [$this->formatTransaction($transactions[0])]
        ];
    }

    public function update(int $customerId, int $transactionId, float $amount): array
    {
        if ($customerId <= 0 || $amount < 0) {
            return ['errMessage' => 'Invalid customerId or amount'];
        }
        
        $transactions = $this->transactionRepo->findBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transactions) {
            return ['errMessage' => 'Transaction not found for updating.'];
        }

        $transaction = $transactions[0];

        $transaction->setAmount($amount);
        $this->em->flush();

        return [
            'transactions' => [$this->formatTransaction($transaction)]
        ];
    }

    public function delete(int $customerId, int $transactionId): array
    {
        $transactions = $this->transactionRepo->findBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transactions) {
            return ['errMessage' => 'Transaction not found for deletion.'];
        }

        $transaction = $transactions[0];

        $this->em->remove($transaction);
        $this->em->flush();

        return ['transactions' => []];
    }

    public function getByFilter(array $search): array
    {
        $transactions = $this->transactionRepo->findBy($search);

        $transactionsFormatted = array_map(
            fn(Transaction $t) => $this->formatTransaction($t),
            $transactions
        );

        return ['transactions' => $transactionsFormatted];
    }
}