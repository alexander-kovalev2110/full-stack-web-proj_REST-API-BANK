<?php

namespace App\Controller;

use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;

class CustomerService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createServ(string $name, string $pw): array
    {
        // Checking the customer for existence
        $customer = $this->entityManager->getRepository(Customer::class)
            ->findOneBy(['name' => $name, 'pw' => $pw]);

        if ($customer) {
            return ['errMessage' => 'Customer already exists.'];
        }

        $customer = new Customer();
        $customer->setName($name);
        $customer->setPw($pw);

        // Saving $customer to Customer DB
        $this->entityManager->persist($customer);
        $this->entityManager->flush();

        return ['customerId' => $customer->getId()];
    }

    public function loginServ(string $name, string $pw): array
    {
        // Getting customer from Customer DB
        $customer = $this->entityManager->getRepository(Customer::class)
            ->findOneBy(['name' => $name, 'pw' => $pw]);

        if ($customer)
            return ['customerId' => $customer->getId()];
        else
            return ['errMessage' => 'Customer is not available.'];
    }
}