<?php

namespace App\Service;

use App\Entity\Transaction;
use App\DTO\TransactionResponse;
use App\DTO\TransactionListResponse;
use App\DTO\FilterTransactionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CustomerRepository;
use App\Repository\TransactionRepository;
use App\DTO\TransactionRequest;
use App\Service\TransactionMapper;

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

    public function create(int $customerId, float $amount): TransactionListResponse
    {
        $customer = $this->customerRepo->find($customerId);

        if (!$customer) {
            throw new NotFoundHttpException('Customer not found.');
        }

        $transaction = (new Transaction())
            ->setCustomer($customer)
            ->setAmount($amount)
            ->setDate(new \DateTime());

        $this->em->persist($transaction);
        $this->em->flush();

        return new TransactionListResponse([
            TransactionMapper::fromEntity($transaction)
        ]);
    }

    public function get(int $customerId, int $transactionId): TransactionListResponse
    {
        $transaction = $this->transactionRepo->findOneBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transaction) {
            throw new NotFoundHttpException('Transaction not found.');
        }

        return new TransactionListResponse([
            TransactionMapper::fromEntity($transaction)
        ]);
    }

    public function update(int $customerId, int $transactionId, float $amount): TransactionListResponse
    {
        $transaction = $this->transactionRepo->findOneBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transaction) {
            throw new NotFoundHttpException('Transaction not found.');
        }

        $transaction->setAmount($amount);
        $this->em->flush();

        // return new TransactionListResponse([
        //     new TransactionResponse(
        //         transactionId: $transaction->getId(),
        //         amount: $transaction->getAmount(),
        //         date: $transaction->getDate()->format('Y-m-d'),
        //         customerId: $transaction->getCustomer()->getId()
        //     )
        // ]);

        return new TransactionListResponse([
            TransactionMapper::fromEntity($transaction)
        ]);
    }

    public function delete(int $customerId, int $transactionId): TransactionListResponse
    {
        $transaction = $this->transactionRepo->findOneBy([
            'customer' => $customerId,
            'id' => $transactionId
        ]);

        if (!$transaction) {
            throw new NotFoundHttpException('Transaction not found.');
        }

        $this->em->remove($transaction);
        $this->em->flush();

        return new TransactionListResponse([
        ]);
    }

    public function getByFilter(int $customerId, FilterTransactionRequest $filter
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