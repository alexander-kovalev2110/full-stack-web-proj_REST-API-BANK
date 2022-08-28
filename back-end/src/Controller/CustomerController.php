<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;

class CustomerController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // Adding of a customer
    #[Route('/customer/{name}/{pw}', name: 'add_customer', methods: ['POST'])]
    public function addCustomer(string $name, string $pw): Response
    {
        // Checking the customer for existence
        $customer = $this->entityManager->getRepository(Customer::class)
        ->findOneBy(['name' => $name, 'pw' => $pw]);
        if ($customer) {
            return new JsonResponse([
                'message' => 'Customer already exists.' 
            ], 400); 
        }

        $customer = new Customer();
        $customer->setName($name);
        $customer->setPw($pw);

        // Saving $customer to Customer DB
        $this->entityManager->persist($customer);
        $this->entityManager->flush();

        // Getting customrId from Customer DB for testing and response
        $customer = $this->entityManager->getRepository(Customer::class)
                ->findOneBy(['name' => $name, 'pw' => $pw]);
        
        if ($customer) {
            return new JsonResponse([
                'customerId' => $customer->getId(),
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Customer is not available.' 
            ], 400); 
        }
    }

    // Customer login
    #[Route('/customer/{name}/{pw}', name: 'login_customer', methods: ['GET'])]
    public function loginCustomer(string $name, string $pw): Response
    {
        // Getting customrId from Customer DB
        $customer = $this->entityManager->getRepository(Customer::class)
                ->findOneBy(['name' => $name, 'pw' => $pw]);
        
        if ($customer) {
            return new JsonResponse([
                'customerId' => $customer->getId(),
            ], 200);
        }
        else {
            return new JsonResponse([
                'message' => 'Customer is not available.'
            ], 400); 
        }
    }
}
