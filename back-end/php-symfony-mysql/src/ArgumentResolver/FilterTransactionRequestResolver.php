<?php

namespace App\ArgumentResolver;

use App\DTO\FilterTransactionRequest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ValueResolverInterface;

class FilterTransactionRequestResolver implements ValueResolverInterface
{
    public function supports(Request $request, \ReflectionParameter $parameter): bool
    {
        return $parameter->getType()?->getName() === FilterTransactionRequest::class;
    }

    public function resolve(Request $request, \ReflectionParameter $parameter): iterable
    {
        $amount = $request->query->get('amount');
        $date = $request->query->get('date');

        yield new FilterTransactionRequest($amount, $date);
    }
}
