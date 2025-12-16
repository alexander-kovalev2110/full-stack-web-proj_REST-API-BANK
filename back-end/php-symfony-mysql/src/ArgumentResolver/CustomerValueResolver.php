<?php

namespace App\ArgumentResolver;

use App\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;
use Symfony\Component\Security\Core\Security;

class CustomerValueResolver implements ArgumentValueResolverInterface
{
    public function __construct(private Security $security) {}

    public function supports(Request $request, ArgumentMetadata $argument): bool
    {
        // Резолвер должен работать только для аргументов типа Customer
        return $argument->getType() === Customer::class;
    }

    public function resolve(Request $request, ArgumentMetadata $argument): iterable
    {
        $user = $this->security->getUser();

        if ($user instanceof Customer) {
            yield $user;
            return;
        }

        // если пользователь не Customer — резолвер ничего не возвращает
        return;
    }
}