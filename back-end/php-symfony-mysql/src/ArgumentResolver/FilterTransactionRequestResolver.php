<?php

namespace App\ArgumentResolver;

use App\DTO\FilterTransactionRequest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

class FilterTransactionRequestResolver implements ArgumentValueResolverInterface
{
    public function supports(Request $request, ArgumentMetadata $argument): bool
    {
        return $argument->getType() === FilterTransactionRequest::class;
    }

    public function resolve(Request $request, ArgumentMetadata $argument): iterable
    {
        $amount = $request->query->get('amount');
        $date = $request->query->get('date');

        yield new FilterTransactionRequest($amount, $date);
    }
}
