<?php

namespace App\DTO;

class TransactionItemResponse
{
    public function __construct(
        public int $transactionId,
        public float $amount,
        public string $date,       // Y-m-d format
        public int $customerId
    ) {}
}
