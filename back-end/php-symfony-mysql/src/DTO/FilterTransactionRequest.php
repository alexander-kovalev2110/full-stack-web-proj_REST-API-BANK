<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class FilterTransactionRequest
{
    #[Assert\Positive(message: 'Amount must be greater than zero.')]
    public ?float $amount = null;

    #[Assert\Type(\DateTimeInterface::class)]
    public ?\DateTimeImmutable $date = null;

    public function __construct(?string $amount, ?string $date)
    {
        $this->amount = $amount !== null && $amount !== ''
            ? (float) $amount
            : null;

        $this->date = $date !== null && $date !== ''
            ? \DateTimeImmutable::createFromFormat('Y-m-d', $date) ?: null
            : null;
    }
}
