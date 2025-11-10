<?php

namespace App\Service;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
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
        private readonly JWTTokenManagerInterface $jwtManager,
    ) {}

    /**
     * Registering a new client
     */
    public function create(string $name, string $pw): string
    {
        // Check for existence
        if ($this->customerRepo->findOneBy(['name' => $name])) {
            throw new ConflictHttpException('Customer with this name already exists.');
        }

        $customer = new Customer();
        $customer->setName($name);

        $hashedPassword = $this->passwordHasher->hashPassword($customer, $pw);
        $customer->setPassword($hashedPassword);

        $this->em->persist($customer);
        $this->em->flush();

        // Generating a JWT token with user data
        return $this->jwtManager->createFromPayload($customer, []);
    }

    /**
     * Client authentication
     */
    public function login(string $name, string $pw): string
    {
        $customer = $this->customerRepo->findOneBy(['name' => $name]);

        if (!$customer) {
            throw new NotFoundHttpException('Customer not found.');
        }

        if (!$this->passwordHasher->isPasswordValid($customer, $pw)) {
            throw new UnauthorizedHttpException('Bearer', 'Invalid password.');
        }

        return $this->jwtManager->createFromPayload($customer, []);
    }
}
