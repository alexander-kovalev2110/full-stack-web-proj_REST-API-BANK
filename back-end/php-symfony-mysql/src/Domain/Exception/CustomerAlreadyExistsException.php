<?php

namespace App\Domain\Exception;

final class CustomerAlreadyExistsException extends \DomainException
{
    public function __construct()
    {
        parent::__construct('Customer already exists.');
    }
}
