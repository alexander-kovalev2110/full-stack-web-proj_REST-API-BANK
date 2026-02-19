<?php

namespace App\Domain\Exception;

final class CustomerNotFoundException extends DomainException
{
    public function __construct()
    {
        parent::__construct('Unauthorized.');
    }

    public function getStatusCode(): int
    {
        return 401;
    }
}


