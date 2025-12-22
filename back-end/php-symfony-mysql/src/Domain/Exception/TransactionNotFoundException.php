<?php

namespace App\Domain\Exception;

// use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class TransactionNotFoundException extends \DomainException

// final class TransactionNotFoundException extends NotFoundHttpException
{
    public function __construct()
    {
        parent::__construct('Transaction not found.');
    }
}
