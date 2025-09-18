<?php

namespace App\Service;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CustomerService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly CustomerRepository $customerRepository
    ){}

    public function createServ(string $name, string $pw): array
    {
        if ($this->customerRepository->findOneBy(['name' => $name])) {
            return ['errMessage' => 'Customer already exists.'];
        }

        $customer = new Customer();
        $customer->setName($name);
        
        $hashedPassword = $this->passwordHasher->hashPassword($customer, $pw);
        $customer->setPassword($hashedPassword);

        $this->entityManager->persist($customer);
        $this->entityManager->flush();

        return ['customerId' => $customer->getId()];
    }

    public function loginServ(string $name, string $pw): array
    {
        $customer = $this->customerRepository->findOneBy(['name' => $name]);
        
        if (!$customer) {
            return ['errMessage' => 'Customer not found.'];
        }

        if (!$this->passwordHasher->isPasswordValid($customer, $pw)) {
            return ['errMessage' => 'Invalid password.'];
        }

        return ['customerId' => $customer->getId()];
    }
}