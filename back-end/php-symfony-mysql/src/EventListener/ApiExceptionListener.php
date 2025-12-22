<?php

namespace App\EventListener;

use App\Domain\Exception\CustomerAlreadyExistsException;
use App\Domain\Exception\CustomerNotFoundException;
use App\Domain\Exception\InvalidCredentialsException;
use App\Domain\Exception\TransactionNotFoundException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

final class ApiExceptionListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        match (true) {
            $exception instanceof CustomerAlreadyExistsException =>
                $this->respond($event, 409, $exception->getMessage()),

            $exception instanceof CustomerNotFoundException =>
                $this->respond($event, 404, $exception->getMessage()),

            $exception instanceof InvalidCredentialsException =>
                $this->respond($event, 401, $exception->getMessage()),

            $exception instanceof TransactionNotFoundException =>
                $this->respond($event, 404, $exception->getMessage()),

            default => null
        };
    }

    private function respond(ExceptionEvent $event, int $status, string $message): void
    {
        $event->setResponse(
            new JsonResponse(
                ['error' => $message],
                $status
            )
        );
    }
}
