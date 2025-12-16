<?php

namespace App\Service;

use App\Entity\Customer;
use App\DTO\RegisterRequest;
use App\DTO\LoginRequest;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class CustomerService
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly CustomerRepository $customerRepo,
    ) {}

    /**
     * Registering a new client
     */
    public function create(RegisterRequest $dto): Customer
    {
        // Check for existence
        if ($this->customerRepo->findOneBy(['name' => $dto->name])) {
            throw new ConflictHttpException('Customer already exists.');
        }

        $customer = new Customer();
        $customer->setName($dto->name);

        $customer->setPassword(
            $this->passwordHasher->hashPassword($customer, $dto->password)
        );

        $this->em->persist($customer);
        $this->em->flush();

        return $customer;
    }

    /**
     * Client authentication
     */
    public function login(LoginRequest $dto): Customer
    {
        $customer = $this->customerRepo->findOneBy(['name' => $dto->name]);

        if (!$customer) {
            throw new NotFoundHttpException('Customer not found.');
        }

        if (!$this->passwordHasher->isPasswordValid($customer, $dto->password)) {
            throw new UnauthorizedHttpException('', 'Invalid password.');
        }

        return $customer;
    }
}
