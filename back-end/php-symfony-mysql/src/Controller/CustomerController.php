<?php

namespace App\Controller;

//use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // Customer create
    #[Route('/customer/{name}/{pw}', name: 'create_customer', methods: ['POST'])]
    public function createCustomer(string $name, string $pw): Response
    {
        $service = new CustomerService($this->entityManager);
        $result = $service->createServ($name, $pw);

        $cod = ($result['customerId'] ?? null) ? 200 : 400;
        return new JsonResponse($result, $cod);
    }

    // Customer login
    #[Route('/customer/{name}/{pw}', name: 'login_customer', methods: ['GET'])]
    public function loginCustomer(string $name, string $pw): Response
    {
        $service = new CustomerService($this->entityManager);
        $result = $service->loginServ($name, $pw);

        $cod = ($result['customerId'] ?? null) ? 200 : 400;
        return new JsonResponse($result, $cod);
    }
}
