<?php

namespace App\Service;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class CustomerService
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly CustomerRepository $customerRepo,
        private readonly JWTTokenManagerInterface $jwtManager,
    ){}

    public function create(string $name, string $pw): array
    {
        if ($this->customerRepo->findOneBy(['name' => $name])) {
            return ['errMessage' => 'Customer with this name already exists.'];
        }

        $customer = new Customer();
        $customer->setName($name);

        $hashedPassword = $this->passwordHasher->hashPassword($customer, $pw);
        $customer->setPassword($hashedPassword);

        $this->em->persist($customer);
        $this->em->flush();

        // Create a token with custom data
        $token = $this->jwtManager->createFromPayload($customer, [
            'customerId' => $customer->getId(),
        ]);
   
        return [
            'token' => $token
        ];
    }

    public function login(string $name, string $pw): array
    {
        $customer = $this->customerRepo->findOneBy(['name' => $name]);

        if (!$customer) {
            return ['errMessage' => 'Customer not found.'];
        }

        if (!$this->passwordHasher->isPasswordValid($customer, $pw)) {
            return ['errMessage' => 'Invalid password.'];
        }

        // Create a token with custom data
        $token = $this->jwtManager->createFromPayload($customer, [
            'customerId' => $customer->getId(),
        ]);
   
        return [
            'token' => $token
        ];
    }
}
