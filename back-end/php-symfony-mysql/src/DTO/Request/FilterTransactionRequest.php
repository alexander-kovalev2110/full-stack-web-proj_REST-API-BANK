<?php

namespace App\DTO;

class FilterTransactionRequest
{
    public ?\DateTimeImmutable $date;
    public ?float $amount;
    public int $page;
    public int $limit;

    /**
     * @param string|\DateTimeImmutable|null $date
     * @param float|null $amount
     * @param int $page
     * @param int $limit
     * @throws \InvalidArgumentException
     */
    public function __construct(
        string|\DateTimeImmutable|null $date = null,
        ?float $amount = null,
        int $page = 1,
        int $limit = 10
    ) {
        $this->amount = $amount;
        $this->page = max(1, $page);                  // minimum page = 1
        $this->limit = max(1, min(100, $limit));      // limit: 1..100

        if ($date instanceof \DateTimeImmutable) {
            $this->date = $date;
        } elseif (is_string($date) && $date !== '') {
            try {
                $this->date = new \DateTimeImmutable($date);
            } catch (\Exception $e) {
                throw new \InvalidArgumentException("Invalid date format: {$date}");
            }
        } else {
            $this->date = null;
        }
    }
}