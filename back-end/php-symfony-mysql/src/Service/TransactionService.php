<?php

namespace App\Service;

use App\Entity\Transaction;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CustomerRepository;
use App\Repository\TransactionRepository;

class TransactionService 
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly CustomerRepository $customerRepository,
        private readonly TransactionRepository $transactionRepository
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

    public function createServ(int $customerId, float $amount): array
    {
        $customer = $this->customerRepository->find($customerId);

        if (!$customer) {
            return ['errMessage' => 'Customer not found.'];
        }

        $transaction = (new Transaction())
            ->setCustomer($customer)
            ->setAmount($amount)
            ->setDate(new \DateTime());

        $this->entityManager->persist($transaction);
        $this->entityManager->flush();

        return [
            'transactions' => [$this->formatTransaction($transaction)]
        ];
    }

    public function getServ(int $transactionId): array
    {
        $transaction = $this->transactionRepository->find($transactionId);

        if (!$transaction) {
            return ['errMessage' => 'Transaction not found.'];
        }

        return [
            'transactions' => [$this->formatTransaction($transaction)]
        ];
    }

    public function updateServ(int $transactionId, float $amount): array
    {
        $transaction = $this->transactionRepository->find($transactionId);

        if (!$transaction) {
            return ['errMessage' => 'Transaction not found for updating.'];
        }

        $transaction->setAmount($amount);
        $this->entityManager->flush();

        return [
            'transactions' => [$this->formatTransaction($transaction)]
        ];
    }

    public function deleteServ(int $transactionId): array
    {
        $transaction = $this->transactionRepository->find($transactionId);

        if (!$transaction) {
            return ['errMessage' => 'Transaction not found for deletion.'];
        }

        $this->entityManager->remove($transaction);
        $this->entityManager->flush();

        return ['transactions' => []];
    }

    public function getByFilterServ(array $search): array
    {
        $transactions = $this->transactionRepository->findBy($search);

        $transactionsFormatted = array_map(
            fn($transaction) => $this->formatTransaction($transaction),
            $transactions
        );

        return ['transactions' => $transactionsFormatted];
    }
}