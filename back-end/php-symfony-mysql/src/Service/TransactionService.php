<?php

namespace App\Service;

use App\Entity\Customer;
use App\Entity\Transaction;
use App\DTO\TransactionResponse;
use App\DTO\TransactionListResponse;
use App\DTO\FilterTransactionRequest;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TransactionRepository;
use App\Service\TransactionMapper;
use App\Domain\Exception\TransactionNotFoundException;

class TransactionService 
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly TransactionRepository $transactionRepo
    ){}

    public function createTransaction(Customer $customer, float $amount): TransactionListResponse
    {
        $transaction = (new Transaction())
            ->setCustomer($customer)
            ->setAmount($amount)
            ->setDate(new \DateTimeImmutable());

        $this->em->persist($transaction);
        $this->em->flush();

        return new TransactionListResponse([
            TransactionMapper::fromEntity($transaction)
        ]);
    }

    public function getTransaction(int $customerId, int $transactionId): TransactionListResponse
    {
        $transaction = $this->transactionRepo->findOneBy([
            'customer' => $customerId, 
            'id'       => $transactionId,
        ]);

        if (!$transaction) {
            throw new TransactionNotFoundException();
        }

        return new TransactionListResponse([
            TransactionMapper::fromEntity($transaction),
        ]);
    }

    public function changeAmount(int $customerId, int $transactionId, float $amount): TransactionListResponse
    {
        $transaction = $this->transactionRepo->findOneBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transaction) {
            throw new TransactionNotFoundException();
        }

        $transaction->setAmount($amount);
        $this->em->flush();

        return new TransactionListResponse([
            TransactionMapper::fromEntity($transaction)
        ]);
    }

    public function removeTransaction(int $customerId, int $transactionId): TransactionListResponse
    {
        $transaction = $this->transactionRepo->findOneBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transaction) {
            throw new TransactionNotFoundException();
        }

        $this->em->remove($transaction);
        $this->em->flush();

        return new TransactionListResponse([
        ]);
    }

    public function getTransactionByFilter(int $customerId, FilterTransactionRequest $filter
    ): TransactionListResponse

    {
        $criteria = ['customer' => $customerId];

        if ($filter->amount !== null) {
            $criteria['amount'] = $filter->amount;
        }

        if ($filter->date !== null) {
            $criteria['date'] = $filter->date;
        }

        $transactions = $this->transactionRepo->findBy($criteria);

        return new TransactionListResponse(
            TransactionMapper::fromEntities($transactions)
        );
    }
}