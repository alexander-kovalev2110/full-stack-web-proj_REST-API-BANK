<?php

namespace App\DTO;

class TransactionListResponse
{
    /**
     * @param TransactionResponse[] $transactions
     */
    public function __construct(
        public array $transactions = []
    ) {}
}
